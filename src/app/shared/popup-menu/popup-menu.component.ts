import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss']
})
export class PopupMenuComponent {

  @Input() popupPosition: {} = {};
  @Input() options: string[] = [];

  @Output() emittedOption: EventEmitter<string>= new EventEmitter<string>()

  public emitClick(clickedOption: string): void {
    this.emittedOption.emit(clickedOption);
  }
}
