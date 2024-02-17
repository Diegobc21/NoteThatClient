import {Component, Input} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input('message') public message: string = 'Texto copiado al portapapeles';

  public mouseOver: boolean = false;

  private visibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get visible$(): Observable<boolean> {
    return this.visibleSubject.asObservable();
  }

  public hide(event: MouseEvent): void {
    this.open();
    this.mouseOver = false;
  }

  public open(): void {
    this.visibleSubject.next(true);
    setTimeout(() => this.visibleSubject.next(false), 2000);
  }

  public close(): void {
    this.visibleSubject.next(false);
  }

  protected readonly onmouseover = onmouseover;
}
