import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  User,
} from 'lucide-angular';
import { OptionsModule } from '../options/options.module';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import {RegularButtonComponent} from "../shared/buttons/regular-button/regular-button.component";

@NgModule({
  declarations: [MainComponent, ProfileComponent, SettingsComponent],
    imports: [
        CommonModule,
        NgOptimizedImage,
        SharedModule,
        OptionsModule,
        FormsModule,
        LucideAngularModule.pick({
            BellRing,
            Copy,
            Check,
            Trash,
            Eye,
            EyeOff,
            Mail,
            User,
            Settings,
            LogOut,
        }),
        RegularButtonComponent,
    ],
  exports: [],
})
export class PagesModule {}
