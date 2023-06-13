import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteComponent} from "./note/note.component";
import {FriendComponent} from "./friend/friend.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {FriendSearchComponent} from './friend/friend-search/friend-search.component';

@NgModule({
  declarations: [
    NoteComponent,
    FriendComponent,
    FriendSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    NoteComponent,
    FriendComponent
  ]
})
export class OptionsModule {
}
