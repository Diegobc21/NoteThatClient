import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {PagesModule} from "./pages/pages.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserModule} from "./user/user.module";
import {RouterModule} from "@angular/router";
import {SpinnerInterceptor} from "./core/interceptor/spinner.interceptor";
import {FormsModule} from "@angular/forms";
import {DarkModeDirective} from "./core/directives/dark-mode.directive";

@NgModule({
  declarations: [
    AppComponent,
    DarkModeDirective
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    UserModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi: true
  }],
  exports: [
    AppComponent,
    DarkModeDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
