import {animate, style, transition, trigger} from "@angular/animations";

export const slideUpDown = trigger('slideUpDown', [
    transition(':enter', [
    style({ opacity: 0, height: 0 }),
    animate(
      '225ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, height: '*' })
    ),
  ]),
  transition(':leave', [
    animate(
      '225ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 0, height: 0 })
    ),
  ])
]);
