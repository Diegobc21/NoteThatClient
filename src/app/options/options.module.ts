import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {CalendarComponent} from './calendar/calendar.component';
import {FriendSearchComponent} from './friend/friend-search/friend-search.component';
import {FriendComponent} from './friend/friend.component';
import {NoteComponent} from './note/note.component';
import {NoteLoadingComponent} from './note/note-loading/note-loading.component';
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Lock,
  LucideAngularModule,
  Plus
} from "lucide-angular";
import {PasswordsComponent} from "./passwords/passwords.component";
import {SpotifyComponent} from "./spotify/spotify.component";
import {NoteDefaultComponent} from "./note/note-default/note-default.component";
import {NoteEditComponent} from "./note/note-edit/note-edit.component";
import {RegularButtonComponent} from "../shared/buttons/regular-button/regular-button.component";
import {NavigationButtonComponent} from "../shared/buttons/navigation-button/navigation-button.component";
import {ShowPasswordButtonComponent} from "../shared/buttons/show-password-button/show-password-button.component";
import {DeleteButtonComponent} from "../shared/buttons/delete-button/delete-button.component";

@NgModule({
  declarations: [
    NoteComponent,
    FriendComponent,
    FriendSearchComponent,
    PasswordsComponent,
    SpotifyComponent,
    CalendarComponent,
    NoteLoadingComponent,
    NoteEditComponent,
    NoteDefaultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgOptimizedImage,
    RegularButtonComponent,
    NavigationButtonComponent,
    ShowPasswordButtonComponent,
    DeleteButtonComponent,
    LucideAngularModule.pick({
      Check, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Lock, Plus
    }),
  ],
  exports: [],
})
export class OptionsModule {
}
