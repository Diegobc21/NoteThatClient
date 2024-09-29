import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";
import {SpinnerService} from "../../../core/services/spinner/spinner.service";
import {LucideIconData} from "lucide-angular/icons/types";

export enum ButtonType {
  Normal = 'normal',
  Fill = 'fill',
  Outline = 'normal',
}

@Component({
  selector: 'app-base-button',
  template: ``,
})
export class BaseButtonComponent {
  @Output() public onClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() public activeRoute: boolean = true;
  @Input() public text: string = '';
  @Input() public type: string = 'button';
  @Input() public title: string = '';
  @Input() public buttonType: ButtonType | string = ButtonType.Normal;
  @Input() public disabled: boolean = false;
  @Input() public showSpinner: boolean = false;
  @Input() public icon: string | LucideIconData | undefined;
  @Input() public iconsize: string | number = 20;

  protected loading$: Observable<boolean> = new Observable<boolean>();

  constructor(private spinnerService: SpinnerService) {
    this.loading$ = this.spinnerService.spinnerVisible$;
  }

  public onClickEmit(event: any): void {
    this.onClick.emit(event);
  }
}
