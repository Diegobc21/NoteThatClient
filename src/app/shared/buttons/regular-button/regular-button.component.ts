import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-regular-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './regular-button.component.html',
  styleUrl: './regular-button.component.scss',
})
export class RegularButtonComponent {
  @Output() public onClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() public withButton: boolean = false;
  @Input() public activeRoute: boolean = true;
  @Input() public text: string = '';
  @Input() public type: string = 'normal'
  @Input() public disabled: boolean = false;

  public onClickEmit(event: any): void {
    this.onClick.emit(event);
  }
}
