import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {AlertComponent} from './alert/alert.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    AlertComponent
  ],
})
export class SharedModule {
}
