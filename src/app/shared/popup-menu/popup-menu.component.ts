import {Component, EventEmitter, Input, Output} from '@angular/core';
import {softFade} from "../../utils/animations/soft-fade";
import {fadeInOut} from "../../utils/animations/fade-in-out";
import {PopupOption} from "../../options/note/note-default/note-default.component";

@Component({
  selector: 'app-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.scss'],
  animations: [
    softFade,
    fadeInOut
  ],
})
export class PopupMenuComponent {
  @Input() options: PopupOption[] = [];
  @Input() isOpen: boolean = false;

  @Output() onCloseEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() emittedOption: EventEmitter<string> = new EventEmitter<string>();

  public emitClick(clickedOption: PopupOption): void {
    clickedOption.action();
    this.hide();
  }

  public hide(): void {
    this.onCloseEvent.emit();
  }
}
