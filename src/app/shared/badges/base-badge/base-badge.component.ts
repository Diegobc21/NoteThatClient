import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-base-badge',
  template: `

  `
})
export class BaseBadgeComponent {
  @Input('text') text: string = '';
  @Input('showText') showText: boolean = true;
  @Input('icon') icon: string = 'copy';

  protected triggerSecondaryIcon: boolean = false;

  public toggleIcon(toggleIcon: string): void {
    const previousIcon: string = this.icon;
    this.triggerSecondaryIcon = true;
    this.icon = toggleIcon;
    setTimeout(() => {
      this.icon = previousIcon;
      this.triggerSecondaryIcon = false;
    }, 1500)
  }

}
