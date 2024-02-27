import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {ClipboardService} from "../../../core/services/clipboard/clipboard.service";
import {Subscription} from "rxjs";
import {PopupComponent} from "../../popup/popup.component";
import {BaseBadgeComponent} from "../base-badge/base-badge.component";
import {softFade} from "../../../utils/animations/soft-fade";

@Component({
  selector: 'app-copy-badge',
  templateUrl: './copy-badge.component.html',
  styleUrl: './copy-badge.component.scss',
  animations: [softFade]
})
export class CopyBadgeComponent extends BaseBadgeComponent implements OnDestroy {
  @ViewChild('appPopup') public appPopup: PopupComponent | undefined;
  @Input() override icon: string = 'copy';
  @Input() public showPopup: boolean = false;

  @Output() onCopy: EventEmitter<boolean> = new EventEmitter<boolean>();

  private onCopySubscription: Subscription;

  constructor(private clipboardService: ClipboardService) {
    super();
    this.onCopySubscription = this.onCopy.subscribe(
      {
        next: (copied: boolean) => {
          if (copied) {
            if (this.showPopup && this.appPopup) {
              this.appPopup.open();
              this.appPopup.message = 'Copiado al portapapeles';
            }
            this.toggleIcon('check');
          }
        }
      })
  }

  public copy(): void {
    if (this.icon !== 'check' && this.text) {
      this.onCopy.emit(this.clipboardService.copyToClipboard(this.text));
    }
  }

  private toggleIcon(toggleIcon: string): void {
    this.triggerSecondaryIcon = true;
    const originalIcon = this.icon;
    this.icon = toggleIcon;
    setTimeout(() => {
      this.icon = originalIcon;
      this.triggerSecondaryIcon = false;
    }, 1500);
  }

  public ngOnDestroy(): void {
    this.onCopySubscription.unsubscribe();
  }
}
