import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AlertComponent} from './alert/alert.component';
import {DarkModeButtonComponent} from './buttons/dark-mode-button/dark-mode-button.component';
import {CardComponent} from './card/card.component';
import {ColorSelectorComponent} from './color-selector/color-selector.component';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {OverlayComponent} from './overlay/overlay.component';
import {PopupMenuComponent} from './popup-menu/popup-menu.component';
import {PopupComponent} from './popup/popup.component';
import {SearchInputComponent} from './search-input/search-input.component';
import {SpinnerComponent} from './spinner/spinner.component';
import {TagComponent} from './tag/tag.component';
import {CopyBadgeComponent} from "./badges/copy-badge/copy-badge.component";
import {
  Check,
  ChevronDown,
  ChevronUp,
  CircleUserRound,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  Lightbulb,
  LightbulbOff,
  Loader2,
  LucideAngularModule,
  Mail,
  Quote,
  Trash,
  X
} from "lucide-angular";
import {InputComponent} from "./input/input.component";
import {RegularButtonComponent} from "./buttons/regular-button/regular-button.component";
import {NavigationButtonComponent} from "./buttons/navigation-button/navigation-button.component";
import {BaseButtonComponent} from "./buttons/base-button/base-button.component";
import {BaseBadgeComponent} from "./badges/base-badge/base-badge.component";
import {QuoteComponent} from "./quote/quote.component";

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
    ColorSelectorComponent,
    OverlayComponent,
    CopyBadgeComponent,
    InputComponent,
    BaseButtonComponent,
    BaseBadgeComponent,
    QuoteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    FormsModule,
    RegularButtonComponent,
    NavigationButtonComponent,
    LucideAngularModule.pick({
      Copy,
      CircleUserRound,
      Check,
      Trash,
      Eye,
      EyeOff,
      ChevronDown,
      Lightbulb,
      LightbulbOff,
      ChevronUp,
      Mail,
      Quote,
      KeyRound,
      Loader2,
      X
    })
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
    ColorSelectorComponent,
    OverlayComponent,
    CopyBadgeComponent,
    InputComponent,
    QuoteComponent
  ],
})
export class SharedModule {
}
