import {Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild,} from '@angular/core';
import {BodyManagerService} from '../../core/services/body-manager/body-manager.service';
import {softFade} from "../../utils/animations/soft-fade";
import {slideUpDown} from "../../utils/animations/slide-up-down";
import {fadeInOut} from "../../utils/animations/fade-in-out";

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [
    softFade,
    slideUpDown,
    fadeInOut
  ]
})
export class OverlayComponent implements OnDestroy {
  @ViewChild('overlayTemplate') public overlayTemplate: ElementRef | any = null;

  @HostListener('mousedown', ['$event'])
  public onClick(event: MouseEvent): void {
    if (!this.overlayTemplate.nativeElement.contains(event.target)) {
      this.hideModal();
    }
  }

  @Output() onHideEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() onAcceptEvent: EventEmitter<null> = new EventEmitter<null>();

  @Input() disableAccept: boolean = false;
  @Input() useActionButton: boolean = true;
  @Input() useCancelButton: boolean = true;
  @Input() showOverlay: boolean = false;

  constructor(private bodyManagerService: BodyManagerService) {
    bodyManagerService.disableScroll();
  }

  public hideModal(): void {
    this.onHideEvent.emit();
    this.overlayTemplate = null;
  }

  public accept(): void {
    this.onAcceptEvent.emit();
  }

  public ngOnDestroy(): void {
    this.bodyManagerService.enableScroll();
  }
}
