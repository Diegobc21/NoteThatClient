import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MediaCheckService {
  private clickSubject: Subject<MouseEvent> = new Subject<MouseEvent>();

  public getClicks(): Observable<MouseEvent> {
    return this.clickSubject.asObservable();
  }

  public emitClick(event: MouseEvent): void {
    this.clickSubject.next(event);
  }

}
