import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {RegisterComponent} from "./user/register/register.component";
import {LoginComponent} from "./user/login/login.component";
import {AuthGuard} from "./guard/auth.guard";
import {ProfileComponent} from "./pages/profile/profile.component";
import {NoteComponent} from "./options/note/note.component";
import {FriendComponent} from "./options/friend/friend.component";

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
        component: FriendComponent
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
