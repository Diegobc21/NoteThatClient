import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {ClipboardService} from "../../../core/services/clipboard/clipboard.service";
import {Subscription} from "rxjs";
import {PopupComponent} from "../../popup/popup.component";

@Component({
  selector: 'app-copy-badge',
  templateUrl: './copy-badge.component.html',
  styleUrl: './copy-badge.component.scss'
})
export class CopyBadgeComponent implements OnDestroy {
  @ViewChild('appPopup') public appPopup: PopupComponent | undefined;

  @Output() onCopy: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input('text') text: string = '';
  @Input('icon') icon: string = 'copy';

  private onCopySubscription: Subscription;

  constructor(private clipboardService: ClipboardService) {
    this.onCopySubscription = this.onCopy.subscribe((copied: boolean) => {
      if (copied) {
        if (this.appPopup) {
          this.appPopup.open();
          this.appPopup.message = 'Copiado al portapapeles';
        }
        this.toggleIcon();
      }
    })
  }

  public copy(): void {
    this.onCopy.emit(this.clipboardService.copyToClipboard(this.text));
  }

  private toggleIcon(): void {
    const previousIcon: string = this.icon;
    this.icon = 'check';
    setTimeout(() => {
      this.icon = previousIcon;
    }, 1500)
  }

  public ngOnDestroy(): void {
    this.onCopySubscription.unsubscribe();
  }
}
