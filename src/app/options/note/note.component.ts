import {Component, OnDestroy} from '@angular/core';
import {Note} from "../../interfaces/note.interface";
import {NoteService} from "../../core/services/note.service";
import {Subject, Subscription, takeUntil} from "rxjs";
import {AlertType} from "../../shared/alert/alert-type";
import {SpinnerService} from "../../core/services/spinner.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  animations: [
    trigger('slideDown', [
      state('hidden', style({height: '0', opacity: '0', overflow: 'hidden'})),
      state('visible', style({height: '*', opacity: '1', overflow: 'hidden'})),
      transition('hidden <=> visible', animate('200ms ease-in-out')),
    ]),
  ],
})
export class NoteComponent implements OnDestroy {

  public isAddingNote: boolean = false;

  public newNote: any = {
    title: '',
    content: ''
  };

  private unsubscribe$: Subject<void> = new Subject<void>();
  private _noteList: Note[] = [];
  private subscriptions: Subscription[] = [];
  private _showAlert: boolean = true;

  protected readonly AlertType = AlertType;

  constructor(
    public spinnerService: SpinnerService,
    private authService: AuthService,
    private noteService: NoteService
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

  get formIsEmpty(): boolean {
    if (this.newNote.content === '') {
      return this.newNote.title === '';
    }
    return this.newNote.title === '';
  }

  public submitNote(): void {
    if (!this.formIsEmpty) {
      this.noteService.addNote({
        title: this.newNote.title,
        content: this.newNote.content,
        creationDate: new Date(),
        user: this.authService.email
      }).pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          complete: (): void => {
            this.toggleIsAddingNote();
            this.noteService.getNotes()
              .pipe(takeUntil(this.unsubscribe$))
              .subscribe({
                next: (notes: Note[]) => {
                  this._noteList = this.sortNotesByDate(notes) ?? [];
                  this.updateAlertVisibility();
                }
              });
            this.resetForm();
          }
        })
    }
  }

  public modalClosed(): void {
    this.showAlert = false;
  }

  public deleteNote(note: Note): void {
    this.noteService.deleteOne(note).pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (deletedNoteId: string) => {
          this._noteList = this._noteList.filter((n: Note) => n._id !== deletedNoteId)
          this.updateAlertVisibility();
        }
      });
  }

  private updateAlertVisibility(): void {
    this.showAlert = this._noteList.length === 0;
  }

  public toggleIsAddingNote(): void {
    this.isAddingNote = !this.isAddingNote;
  }

  public ngOnDestroy(): void {
    this.stopSubscriptions();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getNoteDate(date: Date): string {
    return new Date(date).toLocaleString();
  }

  private resetForm(): void {
    this.newNote = {
      title: '',
      content: ''
    }
  }

  private sortNotesByDate(list: Note[]): Note[] {
    return list.sort((a: Note, b: Note) => {
      const dateA: Date = new Date(a.creationDate);
      const dateB: Date = new Date(b.creationDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

  private startSubscriptions(): void {
    this.subscriptions.push(
      this.noteService.getNotes().pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (notes: Note[]): void => {
            this._noteList = this.sortNotesByDate(notes) ?? [];
            this.updateAlertVisibility();
          }
        })
    )
  }

  private stopSubscriptions(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
