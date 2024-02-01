import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MainComponent} from './main/main.component';
import {ProfileComponent} from './profile/profile.component';
import {OptionsModule} from '../options/options.module';
import {FormsModule} from "@angular/forms";
import {Check, Copy, Eye, EyeOff, LucideAngularModule, Mail, Trash} from "lucide-angular";
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    SettingsComponent
  ],
  imports: [CommonModule, NgOptimizedImage, SharedModule, OptionsModule, FormsModule,
    LucideAngularModule.pick({
      Copy, Check, Trash, Eye, EyeOff, Mail
    })],
  exports: [],
})
export class PagesModule {
}
