import {Component, Injector,} from '@angular/core';
import {Observable, Subject, takeUntil} from 'rxjs';
import {months_ES} from 'src/app/utils/months_ES';
import {Note} from '../../../interfaces/note.interface';
import {AlertType} from '../../../shared/alert/alert-type';
import {SpinnerService} from '../../../core/services/spinner/spinner.service';
import {AuthService} from '../../../core/services/auth/auth.service';
import {NoteService} from '../../../core/services/note/note.service';
import {slideUpDown} from "../../../utils/animations/slide-up-down";
import {SharedHelperComponent} from "../../../utils/shared-helper/shared-helper.component";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
  animations: [slideUpDown]
})
export class NoteComponent extends SharedHelperComponent {

  public isAddingNote: boolean = false;
  public isEditingNote: boolean = false;

  public isDeleteOverlayVisible: boolean = false;
  public selectedNote: Note | undefined;

  public newNote: Note = {
    title: '',
    content: '',
  };

  public editingNote: Note = {
    title: '',
    content: '',
  };

  private _unsubscribe$: Subject<void> = new Subject<void>();
  private _noteList: Note[] = [];
  private _isEmptyNoteList: boolean = true;
  private _months: string[] = months_ES;

  protected readonly AlertType = AlertType;

  constructor(
    private injector: Injector,
    public spinnerService: SpinnerService,
    private authService: AuthService,
    private noteService: NoteService
  ) {
    super(injector);
    this._startSubscriptions();
    this._updateAlertVisibility();
  }

  get noteList(): Note[] {
    return this._noteList;
  }

  get isEmptyNoteList() {
    return this._isEmptyNoteList;
  }

  set isEmptyNoteList(value: boolean) {
    this._isEmptyNoteList = value;
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
    const creationDate = this.noteList[index]?.creationDate;
    const previousDate = this.noteList[index - 1]?.creationDate;
    if (!creationDate || !previousDate) return false;
    const note = new Date(creationDate);
    const previousNote = new Date(previousDate);

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
      this.subscribe(
        this.noteService
          .addOne(newNote)
          .pipe(takeUntil(this._unsubscribe$)),
          (): void => {
            this.toggleCreate();
            this.noteList.push(newNote);
            this._sortNotesByDate();
            this.resetNote();
          },
        () => null,
        () => this.resetNote()
      );
    }
  }

  public submitEditing(): void {
    if (!!this.editingNote?._id && this.editingNote?.title !== '') {
      this.subscribe(this.noteService
        .updateOne(this.editingNote._id, this.editingNote)
        .pipe(takeUntil(this._unsubscribe$)),
        (): void => {
          this.toggleCreate();
          this._noteList = this._noteList.map(note => {
            if (note._id === this.editingNote._id) {
              return {...this.editingNote};
            }
            return note;
          });
          this._sortNotesByDate();
          this._updateAlertVisibility();
          this._resetForm();
        },
        () => null,
        () => this.resetNote()
      );
    }
  }

  public toggleDeleteOverlay(note?: Note): void {
    if (note) {
      this.selectedNote = note;
    }
    this.isDeleteOverlayVisible = !this.isDeleteOverlayVisible;
  }

  public editNote(note: Note): void {
    if (!note._id) return;
    this.editingNote = {
      _id: note._id,
      title: note.title,
      content: note.content,
      creationDate: note.creationDate!,
      user: note.user,
    };
    this.toggleEdit();
  }

  public onDeleteNote(note: Note): void {
    if (!note._id) return;
    this.subscribe(this.noteService
      .deleteOne(note._id)
      .pipe(takeUntil(this._unsubscribe$)),
      (deletedNoteId: string) => {
          this._noteList = this._noteList.filter(
            (n: Note) => n._id !== deletedNoteId
          );
          this._updateAlertVisibility();
          this.toggleDeleteOverlay();
        })
  }

  public modalClosed(): void {
    this.isEmptyNoteList = false;
  }

  public get showSpinner(): Observable<boolean> {
    return this.spinnerService.spinnerVisible$;
  }

  public toggleCreate(): void {
    this.isAddingNote = !this.isAddingNote;
  }

  public toggleEdit(): void {
    this.isEditingNote = !this.isEditingNote;
  }

  private _resetForm(): void {
    this.resetNote();
  }

  private resetNote(): void {
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

  private _updateAlertVisibility(): void {
    this.isEmptyNoteList = this._noteList.length === 0;
  }

  private _sortNotesByDate(list?: Note[]): void {
    this._noteList = (list ?? this._noteList ?? [])?.sort((a: Note, b: Note) => {
      const dateA: Date = new Date(a.creationDate!);
      const dateB: Date = new Date(b.creationDate!);
      return dateB.getTime() - dateA.getTime();
    });
  }

  private _startSubscriptions(): void {
    this.subscribe(this.noteService.getAll().pipe(takeUntil(this._unsubscribe$)),
      (notes: Note[]): void => {
        this._sortNotesByDate(notes);
        this._updateAlertVisibility();
      }
    );
  }
}
