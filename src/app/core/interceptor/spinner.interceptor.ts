import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from "../services/spinner.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private _activeRequest: number = 0;

  constructor(private spinnerService: SpinnerService) {
  }


  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (this._activeRequest === 0) {
  //     this.spinnerService.show();
  //   }
  //   this._activeRequest++;
  //
  //   return next.handle(request)
  //     .pipe(
  //       finalize(() => this._stopLoader())
  //     );
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._activeRequest === 0) {
      this.spinnerService.show2();
    }
    this._activeRequest++;

    return next.handle(request)
      .pipe(
        finalize(() => this._stopLoader())
      );
  }

  private _stopLoader() {
    this._activeRequest--;
    if (this._activeRequest === 0) {
      // this.spinnerService.hide();
      this.spinnerService.hideSpinner()
    }
  }

}
