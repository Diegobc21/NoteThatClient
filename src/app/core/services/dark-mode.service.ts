import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  get isDarkMode(): Observable<boolean> {
    return this.isDarkModeSubject.asObservable();
  }

  toggleDarkMode(): void {
    const currentMode: boolean = this.isDarkModeSubject.value;
    this.isDarkModeSubject.next(!currentMode);
  }
}
