import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MainComponent} from './main/main.component';
import {ProfileComponent} from './profile/profile.component';
import {OptionsModule} from '../options/options.module';
import {FormsModule} from "@angular/forms";
import {
  BellRing,
  Check,
  Copy,
  Eye,
  EyeOff,
  LogOut,
  LucideAngularModule,
  Mail,
  Settings,
  Trash,
  User
} from "lucide-angular";
import {SettingsComponent} from './settings/settings.component';

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    SettingsComponent
  ],
  imports: [CommonModule, NgOptimizedImage, SharedModule, OptionsModule, FormsModule,
    LucideAngularModule.pick({
      BellRing, Copy, Check, Trash, Eye, EyeOff, Mail, User, Settings, LogOut
    })],
  exports: [],
})
export class PagesModule {
}
