import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MainComponent} from "./main/main.component";
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from "../shared/shared.module";
import {OptionsModule} from "../options/options.module";
import {SpotifyComponent} from './spotify/spotify.component';

@NgModule({
  declarations: [
    MainComponent,
    ProfileComponent,
    SpotifyComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    SharedModule,
    OptionsModule
  ],
  exports: []
})
export class PagesModule {
}
