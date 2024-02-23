import {Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild,} from '@angular/core';
import {BodyManagerService} from '../../core/services/body-manager/body-manager.service';
import {softFade} from "../../utils/animations/soft-fade";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [
    softFade,
    trigger('slideUpDown', [
      state('hidden', style({
        height: 0,
        opacity: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*',
        opacity: '1',
        overflow: 'hidden'
      })),
      transition('visible => hidden', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')),
      transition('hidden <=> visible', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ]
})
export class OverlayComponent implements OnDestroy {
  @ViewChild('overlayTemplate') public overlayTemplate!: ElementRef;

  @HostListener('mousedown', ['$event'])
  public onClick(event: MouseEvent): void {
    if (!this.overlayTemplate.nativeElement.contains(event.target)) {
      this.toggleModal();
    }
  }

  @Output() onCloseEvent: EventEmitter<null> = new EventEmitter<null>();
  @Output() onAcceptEvent: EventEmitter<null> = new EventEmitter<null>();

  @Input() disableAccept: boolean = false;
  @Input() useActionButton: boolean = true;
  @Input() useCancelButton: boolean = true;
  @Input() showOverlay: boolean = true;

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
