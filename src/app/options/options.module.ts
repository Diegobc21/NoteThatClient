import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteComponent} from "./note/note.component";
import {FriendComponent} from "./friend/friend.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {FriendSearchComponent} from './friend/friend-search/friend-search.component';
import {CalendarComponent} from './calendar/calendar.component';

@NgModule({
  declarations: [
    NoteComponent,
    FriendComponent,
    FriendSearchComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    NoteComponent,
    FriendComponent,
    CalendarComponent
  ]
})
export class OptionsModule {
}
