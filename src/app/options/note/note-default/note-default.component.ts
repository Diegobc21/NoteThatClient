import {Component, Input} from '@angular/core';
import {Note} from "../../../interfaces/note.interface";
import {NoteService} from "../../../core/services/note/note.service";

@Component({
  selector: 'app-note-default',
  templateUrl: './note-default.component.html',
})
export class NoteDefaultComponent {
  @Input() public note: Note | undefined;

  constructor(private noteService: NoteService) {
  }

  public getNoteDate(date: Date): string {
    return this.noteService.getNoteDate(date);
  }

}
