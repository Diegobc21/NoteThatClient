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

  private unsubscribe$ = new Subject<void>();
  private _noteList: Note[] = [];
  private subscriptions: Subscription[] = [];

  protected readonly AlertType = AlertType;

  constructor(
    public spinnerService: SpinnerService,
    private authService: AuthService,
    private noteService: NoteService
  ) {
    this.startSubscriptions();
  }

  get noteList(): Note[] {
    return this._noteList;
  }

  public submitNote(): void {
    this.noteService.addNote({
      title: this.newNote.title,
      content: this.newNote.content,
      creationDate: new Date(),
      user: this.authService.email
    }).pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (note: Note) => console.log(note),
        complete: (): void => {
          this.toggleIsAddingNote();
          this.noteService.getNotes()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
              next: (notes: Note[]) => {
                this._noteList = this.sortNotesByDate(notes) ?? [];
              }
            });
        }
      })
  }

  public deleteNote(note: Note): void {
    this.noteService.deleteOne(note).pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (deletedNoteId: string) =>
          this._noteList = this._noteList.filter(n => n._id !== deletedNoteId)
      });
  }

  public toggleIsAddingNote(): void {
    this.isAddingNote = !this.isAddingNote;
  }

  public ngOnDestroy(): void {
    this.stopSubscriptions();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getNoteDate(date: any): string {
    return new Date(date).toLocaleString();
  }

  private sortNotesByDate(list: Note[]): Note[] {
    return list.sort((a, b) => {
      const dateA = new Date(a.creationDate);
      const dateB = new Date(b.creationDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

  private startSubscriptions(): void {
    this.subscriptions.push(
      this.noteService.getNotes().pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (notes: Note[]) => {
            this._noteList = this.sortNotesByDate(notes) ?? [];
          }
        })
    )
  }

  private stopSubscriptions(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
