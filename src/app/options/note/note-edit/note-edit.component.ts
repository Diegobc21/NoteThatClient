import {Component, Input} from '@angular/core';
import {Note} from "../../../interfaces/note.interface";
import {NoteService} from "../../../core/services/note/note.service";

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
})
export class NoteEditComponent {
  @Input() public note: Note | undefined;

  constructor(private noteService: NoteService) {
  }

  onTitleChange(event: any): void {
    if (this.note) {
      this.note.title = event || '';
    }
  }

  onContentChange(event: any): void {
    if (this.note) {
      this.note.content = event || '';
    }
  }

  public getNoteDate(date: Date): string {
    return this.noteService.getNoteDate(date);
  }

}
