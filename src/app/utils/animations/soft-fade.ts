import { animate, style, transition, trigger } from '@angular/animations';

export const softFade = trigger('softFade', [
  transition(':enter', [
    style({ opacity: 0, height: 0, transform: 'translateY(-10px)' }),
    animate(
      '225ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, height: '*', transform: 'translateY(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '225ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 0, height: 0, transform: 'translateY(-10px)' })
    ),
  ])
]);
