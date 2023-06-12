import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteComponent} from "./note/note.component";
import {FriendComponent} from "./friend/friend.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    NoteComponent,
    FriendComponent
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
