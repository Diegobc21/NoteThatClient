import {Component, HostListener, OnDestroy,} from '@angular/core';
import {Observable, Subject, Subscription, takeUntil} from 'rxjs';
import {months_ES} from 'src/app/utils/months_ES';
import {Note} from '../../interfaces/note.interface';
import {AlertType} from '../../shared/alert/alert-type';
import {SpinnerService} from '../../core/services/spinner/spinner.service';
import {AuthService} from '../../core/services/auth/auth.service';
import {NoteService} from '../../core/services/note/note.service';
import {slideUpDown} from "../../utils/animations/slide-up-down";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  animations: [slideUpDown]
})
export class NoteComponent implements OnDestroy {

  public isAddingNote: boolean = false;
  public isEditingNote: boolean = false;

  public isDeleteOverlayVisible: boolean = false;
  public selectedNote: Note | undefined;

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
  private _months: string[] = months_ES;

  protected readonly AlertType = AlertType;

  constructor(
    public spinnerService: SpinnerService,
    private authService: AuthService,
    private noteService: NoteService
  ) {
    this._startSubscriptions();
    this._updateAlertVisibility();
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

  get createNoteFormIsEmpty(): boolean {
    if (this.newNote.content === '') {
      return this.newNote.title === '';
    }
    return this.newNote.title === '';
  }

  get editingFormIsEmpty(): boolean {
    return this.editingNote.title?.length === 0;
  }

  public getTimeLineDate(date: Date): string {
    const newDate = new Date(date);
    return `${this._months[newDate.getUTCMonth()]} ${newDate.getFullYear()}`;
  }

  public isDifferentMonth(index: number): boolean {
    const note = new Date(this.noteList[index].creationDate);
    const previousNote = new Date(this.noteList[index - 1]?.creationDate);

    return note.getUTCMonth() !== previousNote.getUTCMonth();
  }

  public submitNote(): void {
    if (!this.createNoteFormIsEmpty) {
      const newNote = {
        title: this.newNote.title,
        content: this.newNote.content,
        creationDate: new Date(),
        user: this.authService.email,
      };
      this.noteService
        .addNote(newNote)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe({
          complete: (): void => {
            this.toggleIsAddingNote();
            this.noteService
              .getUserNotes()
              .pipe(takeUntil(this._unsubscribe$))
              .subscribe({
                next: (notes: Note[]) => {
                  this._noteList.push(newNote);
                  this._noteList = this._sortNotesByDate(notes) ?? [];
                  this._updateAlertVisibility();
                },
              });
            this._resetForm();
          },
        });
      this.resetNote();
    }
  }

  public submitEditing(): void {
    if (this.editingNote.title !== '') {
      console.log(this.editingNote)
      this.noteService
        .editNote(this.editingNote)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe({
          complete: (): void => {
            this.toggleIsAddingNote();
            this.noteService
              .getUserNotes()
              .pipe(takeUntil(this._unsubscribe$))
              .subscribe({
                next: (notes: Note[]) => {
                  this._noteList = this._sortNotesByDate(notes) ?? [];
                  this._updateAlertVisibility();
                },
              });
            this._resetForm();
          },
        });
      this.resetNote();
    }
  }


  public toggleDeleteOverlay(note?: Note): void {
    if (note) {
      this.selectedNote = note;
    }
    this.isDeleteOverlayVisible = !this.isDeleteOverlayVisible;
  }

  public editNote(note: Note): void {
    this.editingNote = {
      _id: note._id,
      title: note.title,
      content: note.content,
      creationDate: note.creationDate,
      user: note.user,
    };
    this.toggleIsEditingNote();
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
          this._updateAlertVisibility();
          this.toggleDeleteOverlay();
        },
      });
  }

  public modalClosed(): void {
    this.showAlert = false;
  }

  public get showSpinner(): Observable<boolean> {
    return this.spinnerService.spinnerVisible$;
  }

  public toggleIsAddingNote(): void {
    this.isAddingNote = !this.isAddingNote;
  }

  public toggleIsEditingNote(): void {
    this.isEditingNote = !this.isEditingNote;
  }

  public ngOnDestroy(): void {
    this._stopSubscriptions();
  }

  private _resetForm(): void {
    this.resetNote();
  }

  private _updateAlertVisibility(): void {
    this.showAlert = this._noteList.length === 0;
  }

  private _sortNotesByDate(list: Note[]): Note[] {
    return list.sort((a: Note, b: Note) => {
      const dateA: Date = new Date(a.creationDate);
      const dateB: Date = new Date(b.creationDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

  private _startSubscriptions(): void {
    this._subscriptions.push(
      this.noteService
        .getUserNotes()
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe({
          next: (notes: Note[]): void => {
            this._noteList = this._sortNotesByDate(notes) ?? [];
            this._updateAlertVisibility();
          },
        })
    );
  }

  private _stopSubscriptions(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
