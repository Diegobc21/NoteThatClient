import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {RegularButtonComponent} from "../shared/buttons/regular-button/regular-button.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        RegularButtonComponent
    ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class UserModule {
}
