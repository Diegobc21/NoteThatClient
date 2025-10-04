import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {Password, Section} from "../../../interfaces/password.interface";
import {BaseApi} from "../base-api/base-api.service";

@Injectable({
  providedIn: 'root',
})
export class SectionService extends BaseApi<Password> {
  constructor(injector: Injector) {
    super(injector, 'section');
  }

  public getUserSections(): Observable<Section[]> {
    const userEmail: string = this.authService.email;
    return this.http.get<Section[]>(`${this.endpoint}/${userEmail}`, {
      headers: this.authService.getHeaders(),
    });
  }

  public override addOne(section: Section): Observable<any> {
    const user: string = this.authService.email;
    return super.addOne({...section, user})
  }
}
