import {animate, state, style, transition, trigger} from '@angular/animations';

export const softFade = trigger('softFade', [
  state('hidden', style({
    opacity: '0',
    height: '0',
    transform: 'translateY(-10px)',
    overflow: 'hidden'
  })),
  state('visible', style({
    opacity: '1',
    height: '*',
    transform: 'translateY(0)',
    overflow: 'hidden'
  })),
  transition('hidden => visible', animate('225ms cubic-bezier(0.4, 0, 0.2, 1)')),
  transition('visible => hidden', animate('195ms cubic-bezier(0.4, 0, 0.2, 1)'))
]);
