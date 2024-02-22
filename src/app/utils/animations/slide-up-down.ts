import {animate, state, style, transition, trigger} from "@angular/animations";

export const slideUpDown = trigger('slideUpDown', [
  state('hidden', style({
    height: '0',
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
]);
