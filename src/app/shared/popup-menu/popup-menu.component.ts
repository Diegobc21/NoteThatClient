import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss']
})
export class PopupMenuComponent {
  @Input() options: string[] = [];
  @Input() isOpen: boolean = false;

  @Output() onCloseEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() emittedOption: EventEmitter<string> = new EventEmitter<string>()

  public emitClick(clickedOption: string): void {
    this.emittedOption.emit(clickedOption);
    this.hide();
  }

  public hide(): void {
    this.onCloseEvent.emit();
  }

}
