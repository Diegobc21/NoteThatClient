import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {BodyManagerService} from "../../core/services/body-manager.service";

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnDestroy {
  @Output() onCloseEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() onAcceptEvent: EventEmitter<null> = new EventEmitter<null>();

  @Input() disableAccept: boolean = false;

  constructor(private bodyManagerService: BodyManagerService) {
    bodyManagerService.disableScroll();
  }

  public toggleModal(): void {
    this.onCloseEvent.emit();
  }

  public accept(): void {
    this.onAcceptEvent.emit();
  }

  public ngOnDestroy(): void {
    this.bodyManagerService.enableScroll();
  }
}
