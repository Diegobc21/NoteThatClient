import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './calendar/calendar.component';
import { FriendSearchComponent } from './friend/friend-search/friend-search.component';
import { FriendComponent } from './friend/friend.component';
import { NoteComponent } from './note/note.component';
import { LoadingNoteComponent } from './note/loading-note.component.ts/loading-note.component';

@NgModule({
  declarations: [
    NoteComponent,
    FriendComponent,
    FriendSearchComponent,
    CalendarComponent,
    LoadingNoteComponent
  ],
  imports: [CommonModule, FormsModule, SharedModule],
  exports: [],
})
export class OptionsModule {}
