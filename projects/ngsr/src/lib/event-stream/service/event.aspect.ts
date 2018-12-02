import { Aspect } from '../../aop/aop.service';
import { EventService } from './event.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EventAspect implements Aspect {

  constructor(private event: EventService) { }

  weave(target: any) {
    throw new Error('Method not implemented.');
  }
}
