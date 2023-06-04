import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MainComponent} from "./main/main.component";
import { ProfileComponent } from './profile/profile.component';
import { OptionComponent } from './option/option.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    OptionComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage,
        SharedModule
    ],
  exports: [
    MainComponent
  ]
})
export class PagesModule {
}
