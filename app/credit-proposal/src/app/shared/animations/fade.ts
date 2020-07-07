import { trigger, transition, style, animate } from '@angular/animations';

export const fade: any = trigger('fade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.3s', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('0.3s', style({ opacity: 0 }))
  ])
]);
