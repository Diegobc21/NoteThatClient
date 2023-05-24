import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MainComponent} from "./main/main.component";
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage
    ],
  exports: [
    MainComponent
  ]
})
export class PagesModule {
}
