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

  @Input() public showPopup: boolean = true;

  @Output() onCopy: EventEmitter<boolean> = new EventEmitter<boolean>();

  private onCopySubscription: Subscription;

  constructor(private clipboardService: ClipboardService) {
    super();
    this.onCopySubscription = this.onCopy.subscribe((copied: boolean) => {
      if (copied) {
        if (this.appPopup) {
          this.appPopup.open();
          this.appPopup.message = 'Copiado al portapapeles';
        }
        this.toggleIcon('check');
      }
    })
  }

  public copy(): void {
    this.onCopy.emit(this.clipboardService.copyToClipboard(this.text));
  }

  public ngOnDestroy(): void {
    this.onCopySubscription.unsubscribe();
  }
}
