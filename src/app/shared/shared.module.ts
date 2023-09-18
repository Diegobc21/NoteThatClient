import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {AlertComponent} from './alert/alert.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CardComponent} from './card/card.component';
import {PopupComponent} from './popup/popup.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {TagComponent} from './tag/tag.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {PopupMenuComponent} from './popup-menu/popup-menu.component';
import {DarkModeButtonComponent} from './buttons/dark-mode-button/dark-mode-button.component';
import {ColorSelectorComponent} from './color-selector/color-selector.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AlertComponent,
    CardComponent,
    PopupComponent,
    SpinnerComponent,
    TagComponent,
    SearchInputComponent,
    PopupMenuComponent,
    DarkModeButtonComponent,
    ColorSelectorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    AlertComponent,
    CardComponent,
    PopupComponent,
    SpinnerComponent,
    TagComponent,
    SearchInputComponent,
    PopupMenuComponent,
    DarkModeButtonComponent,
    ColorSelectorComponent
  ],
})
export class SharedModule {
}
