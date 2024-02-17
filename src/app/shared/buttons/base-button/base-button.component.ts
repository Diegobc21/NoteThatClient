import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-base-button',
  templateUrl: './base-button.component.html',
  styleUrl: './base-button.component.scss'
})
export class BaseButtonComponent {
  @Output() public onClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() public activeRoute: boolean = true;
  @Input() public text: string = '';
  @Input() public title: string = '';
  @Input() public type: string = 'normal'
  @Input() public disabled: boolean = false;
  @Input() public loading$: Observable<boolean> = new Observable<boolean>();

  public onClickEmit(event: any): void {
    this.onClick.emit(event);
  }
}
