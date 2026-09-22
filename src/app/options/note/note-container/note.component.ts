import {Component, Injector,} from '@angular/core';
import {Observable} from 'rxjs';
import {months_ES} from 'src/app/utils/months_ES';
import {Note, NoteDraft} from '../../../interfaces/note.interface';
import {AlertType} from '../../../shared/alert/alert-type';
import {SpinnerService} from '../../../core/services/spinner/spinner.service';
import {NoteService} from '../../../core/services/note/note.service';
import {slideUpDown} from "../../../utils/animations/slide-up-down";
import {SharedHelperComponent} from "../../../utils/shared-helper/shared-helper.component";

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss'],
    animations: [slideUpDown],
    standalone: false
})
export class NoteComponent extends SharedHelperComponent {

  public isAddingNote: boolean = false;
  public isEditingNote: boolean = false;

  public isDeleteOverlayVisible: boolean = false;
  public selectedNote: Note | undefined;
  public errorMessage: string = '';

  public newNote: NoteDraft = {
    title: '',
    content: '',
  };

  public editingNote: Note | undefined;

  private _noteList: Note[] = [];
  private _isEmptyNoteList: boolean = true;
  private _months: string[] = months_ES;

  protected readonly AlertType = AlertType;

  constructor(
    private injector: Injector,
    public spinnerService: SpinnerService,
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
    return this.newNote.title.trim().length === 0;
  }

  get editingFormIsEmpty(): boolean {
    return !this.editingNote || this.editingNote.title.trim().length === 0;
  }

  public getTimeLineDate(date: Date | string): string {
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
      this.subscribe(
        this.noteService
          .addOne(this.newNote),
          (createdNote: Note): void => {
            this._noteList = [...this._noteList, createdNote];
            this._sortNotesByDate();
            this.resetNote();
            this._updateAlertVisibility();
          },
        undefined,
        () => this._showRequestError('No se ha podido crear la nota.')
      );
    }
  }

  public submitEditing(): void {
    if (this.editingNote && !this.editingFormIsEmpty) {
      const { _id, title, content } = this.editingNote;
      this.subscribe(this.noteService
        .updateOne(_id, {title, content}),
        (updatedNote: Note): void => {
          this.isEditingNote = false;
          this._noteList = this._noteList.map(note => {
            if (note._id === updatedNote._id) {
              return updatedNote;
            }
            return note;
          });
          this._sortNotesByDate();
          this._updateAlertVisibility();
          this._resetForm();
        },
        undefined,
        () => this._showRequestError('No se ha podido actualizar la nota.')
      );
    }
  }

  public toggleDeleteOverlay(note?: Note): void {
    if (note) {
      this.selectedNote = note;
      this.isDeleteOverlayVisible = true;
      return;
    }
    this.selectedNote = undefined;
    this.isDeleteOverlayVisible = false;
  }

  public editNote(note: Note): void {
    if (!note._id) return;
    this.editingNote = {
      _id: note._id,
      title: note.title,
      content: note.content,
      creationDate: note.creationDate,
      user: note.user,
    };
    this.toggleEdit();
  }

  public onDeleteNote(note: Note): void {
    this.subscribe(this.noteService
      .deleteOne(note._id),
      (): void => {
          this._noteList = this._noteList.filter(
            (n: Note) => n._id !== note._id
          );
          this._updateAlertVisibility();
          this.toggleDeleteOverlay();
        },
        undefined,
        () => this._showRequestError('No se ha podido eliminar la nota.')
      )
  }

  public modalClosed(): void {
    this.isEmptyNoteList = false;
    this.errorMessage = '';
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
    this.editingNote = undefined;
  }

  private _updateAlertVisibility(): void {
    this.isEmptyNoteList = this._noteList.length === 0;
  }

  private _sortNotesByDate(list?: Note[]): void {
    this._noteList = [...(list ?? this._noteList)].sort((a: Note, b: Note) => {
      const dateA: Date = new Date(a.creationDate);
      const dateB: Date = new Date(b.creationDate);
      return dateB.getTime() - dateA.getTime();
    });
  }

  private _startSubscriptions(): void {
    this.subscribe(this.noteService.getAll(),
      (notes: Note[]): void => {
        this._sortNotesByDate(notes);
        this._updateAlertVisibility();
      },
      undefined,
      () => this._showRequestError('No se han podido cargar las notas.')
    );
  }

  private _showRequestError(message: string): void {
    this.errorMessage = message;
  }
}
