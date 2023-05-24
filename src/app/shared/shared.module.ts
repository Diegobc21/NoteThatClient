import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {AlertComponent} from './alert/alert.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CardComponent} from './card/card.component';
import {PopupComponent} from './popup/popup.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AlertComponent,
    CardComponent,
    PopupComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        RouterLinkActive,
        NgOptimizedImage
    ],
  exports: [
    NavbarComponent,
    FooterComponent,
    AlertComponent,
    CardComponent,
    PopupComponent
  ],
})
export class SharedModule {
}
