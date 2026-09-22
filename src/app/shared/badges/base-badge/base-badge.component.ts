import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-base-badge',
    template: `

  `,
    standalone: false
})
export class BaseBadgeComponent {
  @Input('text') text: string | undefined;
  @Input('showText') showText: boolean = true;
  @Input('icon') icon: string | undefined;

  protected triggerSecondaryIcon: boolean = false;

  constructor() {
  }

}
