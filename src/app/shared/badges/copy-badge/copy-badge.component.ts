import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ClipboardService} from "../../../core/services/clipboard/clipboard.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-copy-badge',
  templateUrl: './copy-badge.component.html',
  styleUrl: './copy-badge.component.scss'
})
export class CopyBadgeComponent implements OnDestroy {

  @Output() onCopy: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input('text') text: string = '';
  @Input('icon') icon: string = 'copy';

  private onCopySubscription: Subscription;

  constructor(private clipboardService: ClipboardService) {
    this.onCopySubscription = this.onCopy.subscribe((copied: boolean) => {
      if (copied) {
        const previousIcon: string = this.icon;
        this.icon = 'check';
        setTimeout(() => {
          this.icon = previousIcon;
        }, 1500)
      }
    })
  }

  public copy(): void {
    this.onCopy.emit(this.clipboardService.copyToClipboard(this.text));
  }

  public ngOnDestroy() {
    this.onCopySubscription.unsubscribe();
  }
}
