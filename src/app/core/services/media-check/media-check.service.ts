import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MediaCheckService {
  private clickSubject: Subject<MouseEvent | undefined> = new Subject<MouseEvent | undefined>();

  public getClicks(): Observable<MouseEvent | undefined> {
    return this.clickSubject.asObservable();
  }

  public emitClick(event?: MouseEvent): void {
    this.clickSubject.next(event);
  }

}
