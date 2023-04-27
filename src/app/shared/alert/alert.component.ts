import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input('type') public type!: string;
  @Input('message') public message!: string;

  @Output() onClose: EventEmitter<boolean> = new EventEmitter();

  public removeAlert(event: MouseEvent): void {
    event.preventDefault();

    this.onClose.emit(true);
  }

  public getClasses(): string {
    let classes = 'border px-4 py-3 rounded relative';
    if (this.type === AlertType.SUCCESS) {
      return classes + ' bg-green-100 border-green-400 text-green-700';
    }
    if (this.type === AlertType.WARNING) {
      return classes + ' bg-yellow-100 border-yellow-400 text-yellow-700';
    }
    return classes + ' bg-red-100 border-red-400 text-red-700';
  }

}

export enum AlertType {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success'
}

export default AlertType;
