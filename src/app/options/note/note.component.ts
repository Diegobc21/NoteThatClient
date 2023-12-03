import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { months } from 'src/app/utils/months';
import { AuthService } from '../../core/services/auth.service';
import { NavigationService } from '../../core/services/navigation.service';
import { NoteService } from '../../core/services/note.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { Note } from '../../interfaces/note.interface';
import { AlertType } from '../../shared/alert/alert-type';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  animations: [
    trigger('slideDown', [
      state('hidden', style({ height: '0', opacity: '0', overflow: 'hidden' })),
      state(
        'visible',
        style({ height: '*', opacity: '1', overflow: 'hidden' })
      ),
      transition('hidden <=> visible', animate('200ms ease-in-out')),
    ]),
    trigger('slideUp', [
      state('hidden', style({ height: '0', opacity: '0', overflow: 'hidden' })),
      state(
        'visible',
        style({ height: '*', opacity: '1', overflow: 'hidden' })
      ),
      transition('visible => hidden', animate('200ms ease-in-out')),
    ]),
  ],
})
export class NoteComponent implements OnDestroy {
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this._windowScrollY = window.scrollY;
  }

  @HostListener('document:dblclick', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    console.log(event);
  }

  @ViewChild('editingTitle', { static: false }) editingTitle!: ElementRef;
  @ViewChild('editingContent', { static: false }) editingContent!: ElementRef;

  public isAddingNote: boolean = false;
  public isEditingNote: boolean = false;
  public popupEnabled: boolean = false;
  public isDeleteOverlayVisible: boolean = false;
  public popupPosition: {} = {};
  public popupOptions: string[] = ['Editar', 'Eliminar'];
  public selectedNote: Note | null = null;

  public newNote: any = {
    title: '',
    content: '',
  };

  public editingNote: any = {
    title: '',
    content: '',
    _id: '',
  };

  private _unsubscribe$: Subject<void> = new Subject<void>();
  private _noteList: Note[] = [];
  private _editingFormIsEmpty: boolean = false;
  private _subscriptions: Subscription[] = [];
  private _showAlert: boolean = true;
  private _windowScrollY: number = 0;
  private _months: string[] = months;

  protected readonly AlertType = AlertType;

  constructor(
    public spinnerService: SpinnerService,
    private authService: AuthService,
    private noteService: NoteService,
    private navigationService: NavigationService
  ) {
    this.startSubscriptions();
    this.updateAlertVisibility();
  }

  get noteList(): Note[] {
    return this._noteList;
  }

  get showAlert() {
    return this._showAlert;
  }

  set showAlert(value: boolean) {
    this._showAlert = value;
  }

  get addingFormIsEmpty(): boolean {
    if (this.newNote.content === '') {
      return this.newNote.title === '';
    }
    return this.newNote.title === '';
  }

  get editingFormIsEmpty(): boolean {
    return this._editingFormIsEmpty;
  }

  public setEditingFormIsEmpty(): void {
    this._editingFormIsEmpty = !this.editingNote.title;
  }

  public getTimeLineDate(date: Date): string {
    const newDate = new Date(date);
    return `${this._months[newDate.getMonth()]} ${newDate.getFullYear()}`;
  }

  public isDifferentMonth(index: number): boolean {
    const note = new Date(this.noteList[index].creationDate);
    const previousNote = new Date(this.noteList[index - 1]?.creationDate);

    return note.getUTCMonth() !== previousNote.getUTCMonth();
  }

  public goToHome(): void {
    this.navigationService.navigateToHome().then();
  }

  public submitNote(): void {
    if (!this.addingFormIsEmpty) {
      this.noteService
        .addNote({
          title: this.newNote.title,
          content: this.newNote.content,
          creationDate: new Date(),
          user: this.authService.email,
        })
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe({
          complete: (): void => {
            this.toggleIsAddingNote();
            this.noteService
              .getNotes()
              .pipe(takeUntil(this._unsubscribe$))
              .subscribe({
                next: (notes: Note[]) => {
                  this._noteList = this.sortNotesByDate(notes) ?? [];
                  this.updateAlertVisibility();
                },
              });
            this.resetForm();
          },
        });
      this.resetNote();
    }
  }

  public submitEditing(): void {
    if (this.editingNote.title !== '') {
      this.noteService
        .editNote({
          _id: this.editingNote._id,
          title: this.editingTitle?.nativeElement.value,
          content: this.editingContent?.nativeElement.value,
          user: this.authService.email,
          creationDate: this.editingNote.creationDate,
        })
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe({
          complete: (): void => {
            this.toggleIsAddingNote();
            this.noteService
              .getNotes()
              .pipe(takeUntil(this._unsubscribe$))
              .subscribe({
                next: (notes: Note[]) => {
                  this._noteList = this.sortNotesByDate(notes) ?? [];
                  this.updateAlertVisibility();
                },
              });
            this.resetForm();
          },
        });
      this.resetNote();
    }
  }

  public handlePopupOption(event: string): void {
    if (this.popupOptions[0] === event) {
      this.editNote(this.selectedNote!);
    } else {
      this.toggleDeleteOverlay();
    }
    this.toggleClickPopup();
  }

  public toggleDeleteOverlay(): void {
    this.isDeleteOverlayVisible = !this.isDeleteOverlayVisible;
  }

  public toggleEditing(note: Note, event: MouseEvent): void {
    this.toggleClickPopup(event);
    this.selectedNote = note;
  }

  private toggleClickPopup(event?: MouseEvent): void {
    if (event) {
      this.popupPosition = {
        left: `${event.clientX}px`,
        top: `${event.clientY + this._windowScrollY}px`,
      };
    }
    this.popupEnabled = !this.popupEnabled;
  }

  public getPopupPosition(): {} {
    return this.popupPosition;
  }

  public editNote(note: Note, event?: MouseEvent): void {
    this.editingNote = {
      _id: note._id,
      title: note.title,
      content: note.content,
      creationDate: note.creationDate,
      user: note.user,
    };
    this.toggleIsEditingNote();
    event?.stopPropagation();
  }

  public resetNote(): void {
    this.isAddingNote = false;
    this.isEditingNote = false;
    this.newNote = {
      title: '',
      content: '',
    };
    this.editingNote = {
      title: '',
      content: '',
    };
  }

  public deleteNote(note: Note): void {
    this.noteService
      .deleteOne(note)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (deletedNoteId: string) => {
          this._noteList = this._noteList.filter(
            (n: Note) => n._id !== deletedNoteId
          );
          this.updateAlertVisibility();
          this.toggleDeleteOverlay();
        },
      });
  }

  public modalClosed(): void {
    this.showAlert = false;
  }

  public showSpinner(): Observable<boolean> {
    return this.spinnerService.getSpinnerVisibility();
  }

  private updateAlertVisibility(): void {
    this.showAlert = this._noteList.length === 0;
  }

  public toggleIsAddingNote(): void {
    this.isAddingNote = !this.isAddingNote;
  }

  public toggleIsEditingNote(): void {
    this.isEditingNote = !this.isEditingNote;
  }

  public getNoteDate(date: Date): string {
    const newDate = new Date(date);
    const dayOfMonth = newDate.getUTCDate();
    const monthIndex = newDate.getUTCMonth();
    const year = newDate.getUTCFullYear();

    return `${dayOfMonth} de ${months[monthIndex].toLowerCase()} ${year}`;
  }

  public ngOnDestroy(): void {
    this.stopSubscriptions();
  }

  private resetForm(): void {
    this.resetNote();
  }

  private sortNotesByDate(list: Note[]): Note[] {
    return list.sort((a: Note, b: Note) => {
      const dateA: Date = new Date(a.creationDate);
      const dateB: Date = new Date(b.creationDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

  private startSubscriptions(): void {
    this._subscriptions.push(
      this.noteService
        .getNotes()
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe({
          next: (notes: Note[]): void => {
            this._noteList = this.sortNotesByDate(notes) ?? [];
            this.updateAlertVisibility();
          },
        })
    );
  }

  private stopSubscriptions(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
