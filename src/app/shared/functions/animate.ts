import {
  trigger,
  state,
  style,
  transition,
  animate,
  group,
} from '@angular/animations';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state(
      'in',
      style({
        'max-height': '1000px',
        opacity: '1',
        visibility: 'visible',
      })
    ),
    state(
      'out',
      style({
        'max-height': '0px',
        opacity: '0',
        visibility: 'hidden',
      })
    ),
    transition('in => out', [
      group([
        animate(
          '125ms ease-in-out',
          style({
            opacity: '0',
          })
        ),
        animate(
          '175ms ease-in-out',
          style({
            'max-height': '0px',
          })
        ),
        animate(
          '250ms ease-in-out',
          style({
            visibility: 'hidden',
          })
        ),
      ]),
    ]),
    transition('out => in', [
      group([
        animate(
          '1ms ease-in-out',
          style({
            visibility: 'visible',
          })
        ),
        animate(
          '175ms ease-in-out',
          style({
            'max-height': '1000px',
          })
        ),
        animate(
          '125ms ease-in-out',
          style({
            opacity: '1',
          })
        ),
      ]),
    ]),
  ]),
];
