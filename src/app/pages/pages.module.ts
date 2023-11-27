import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';
import { PasswordsComponent } from '../options/passwords/passwords.component';
import { ProfileComponent } from './profile/profile.component';
import { SpotifyComponent } from '../options/spotify/spotify.component';
import { OptionsModule } from '../options/options.module';

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    SpotifyComponent,
    PasswordsComponent,
  ],
  imports: [CommonModule, NgOptimizedImage, SharedModule, OptionsModule],
  exports: [],
})
export class PagesModule {}
