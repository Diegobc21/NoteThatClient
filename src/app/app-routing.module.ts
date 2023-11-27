import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {RegisterComponent} from "./user/register/register.component";
import {LoginComponent} from "./user/login/login.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {ProfileComponent} from "./pages/profile/profile.component";
import {NoteComponent} from "./options/note/note.component";
import {FriendComponent} from "./options/friend/friend.component";
import {FriendSearchComponent} from "./options/friend/friend-search/friend-search.component";
import {SpotifyComponent} from "./options/spotify/spotify.component";
import {CalendarComponent} from "./options/calendar/calendar.component";
import { PasswordsComponent } from './options/passwords/passwords.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: MainComponent
  },
  {
    path: 'option',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'note',
        component: NoteComponent
      },
      {
        path: 'friends',
        children: [
          {
            path: '',
            component: FriendComponent
          },
          {
            path: 'search',
            component: FriendSearchComponent
          }
        ]
      },
      {
        path: 'spotify',
        component: SpotifyComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'passwords',
        component: PasswordsComponent
      }
    ]
  },
  {
    path: 'user',
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
