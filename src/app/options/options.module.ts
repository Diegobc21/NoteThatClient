import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {CalendarComponent} from './calendar/calendar.component';
import {FriendSearchComponent} from './friend/friend-search/friend-search.component';
import {FriendComponent} from './friend/friend.component';
import {NoteComponent} from './note/note.component';
import {NoteLoadingComponent} from './note/note-loading/note-loading.component';
import {Check, ChevronDown, ChevronUp, Copy, Eye, EyeOff, LucideAngularModule, Trash, Lock} from "lucide-angular";
import {PasswordsComponent} from "./passwords/passwords.component";
import {SpotifyComponent} from "./spotify/spotify.component";

@NgModule({
  declarations: [
    NoteComponent,
    FriendComponent,
    FriendSearchComponent,
    PasswordsComponent,
    SpotifyComponent,
    CalendarComponent,
    NoteLoadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgOptimizedImage,
    LucideAngularModule.pick({
      Copy, Check, Trash, Eye, EyeOff, ChevronDown, ChevronUp, Lock
    })
  ],
  exports: [],
})
export class OptionsModule {
}
