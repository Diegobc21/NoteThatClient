import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodyManagerService {

  public disableScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  public enableScroll(): void {
    document.body.style.overflow = 'auto';
  }
}
