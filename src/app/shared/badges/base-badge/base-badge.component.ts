import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-base-badge',
  template: `

  `
})
export class BaseBadgeComponent {
  @Input('text') text: string = '';
  @Input('icon') icon: string = 'copy';

  public toggleIcon(toggleIcon: string): void {
    const previousIcon: string = this.icon;
    this.icon = toggleIcon;
    setTimeout(() => {
      this.icon = previousIcon;
    }, 1500)
  }

}
