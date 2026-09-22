import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {Section, SectionCreate, SectionUpdate} from "../../../interfaces/password.interface";
import {BaseApi} from "../base-api/base-api.service";

@Injectable({
  providedIn: 'root',
})
export class SectionService extends BaseApi<Section, SectionCreate, SectionUpdate> {
  constructor(injector: Injector) {
    super(injector, 'section');
  }

  public getUserSections(): Observable<Section[]> {
    return this.getAll();
  }
}
