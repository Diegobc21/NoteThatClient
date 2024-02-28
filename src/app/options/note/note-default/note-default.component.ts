import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {Note} from "../../../interfaces/note.interface";
import {NoteService} from "../../../core/services/note/note.service";

@Component({
  selector: 'app-note-default',
  templateUrl: './note-default.component.html'
})
export class NoteDefaultComponent {
  @ViewChild('popupButton') private popupButton: ElementRef | undefined;

  @Input() public note: Note | undefined;
  @Input() public alwaysHideMenu: boolean = false;
  @Input() public showCopyBadge: boolean = false;

  @Output() public onEditNote: EventEmitter<Note> = new EventEmitter<Note>();
  @Output() public onDeleteNote: EventEmitter<Note> = new EventEmitter<Note>();

  public popupOptions: string[] = ['Editar', 'Eliminar'];
  public showMenu: boolean = false;

  public mobileScreen: boolean = true;

  private _showPopup: boolean = false;

  constructor(
    private noteService: NoteService,
    private _renderer: Renderer2,
  ) {
    this.enableListeners();
  }

  public get showPopup(): boolean {
    return this._showPopup;
  }

  public getNoteDate(date: Date): string {
    return this.noteService.getNoteDate(date);
  }

  public menuButtonVisible(): boolean {
    return this.mobileScreen ? !this.alwaysHideMenu : this.showMenu && !this.alwaysHideMenu;
  }

  public togglePopup(): void {
    this._showPopup = !this._showPopup;
  }

  public handlePopupOption(event: string): void {
    if (this.popupOptions[0] === event) {
      this.onEditNote.emit(this.note);
    } else if (this.popupOptions[1] === event) {
      this.onDeleteNote.emit(this.note);
    }
  }

  private enableListeners(): void {
    this._renderer.listen('document', 'click', (e: Event): void => {
      if (this.popupButton?.nativeElement.contains(e.target) || this.showPopup) {
        this.togglePopup();
      }
    });

    this.mobileScreen = window.innerWidth < 1024;
    this._renderer.listen('window', 'resize', (e: any): void => {
      this.mobileScreen = e.target?.innerWidth < 1024;
    });
  }

  protected readonly onmouseover = onmouseover;
}
