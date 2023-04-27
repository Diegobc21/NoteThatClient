import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from "./main/main.component";
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MainComponent
  ]
})
export class PagesModule {
}
