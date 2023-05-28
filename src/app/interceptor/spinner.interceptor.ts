import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {SpinnerService} from "../core/services/spinner.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private _activeRequest = 0;

  constructor(private spinnerService: SpinnerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._activeRequest === 0) {
      this.spinnerService.show(); // Mostrar el spinner antes de la solicitud
    }
    this._activeRequest++;

    return next.handle(request).pipe(finalize(() => this._stopLoader()));
  }


  private _stopLoader() {
    this._activeRequest--;
    if (this._activeRequest === 0) {
      this.spinnerService.hide(); // Ocultar el spinner después de la respuesta
    }
  }

}
