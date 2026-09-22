import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerInterceptor } from './core/interceptor/spinner.interceptor';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@NgModule({ declarations: [AppComponent],
    exports: [AppComponent],
    bootstrap: [AppComponent], imports: [FormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        RouterModule,
        AppRoutingModule,
        SharedModule,
        PagesModule,
        UserModule], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SpinnerInterceptor,
            multi: true,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
