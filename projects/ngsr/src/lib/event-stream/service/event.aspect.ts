import { Aspect } from '../../aop/aop.service';
import { EventService } from './event.service';
import { Injectable } from '@angular/core';
import { getConstructor } from 'ngsr/lib/tools';

@Injectable({ providedIn: 'root' })
export class EventAspect implements Aspect {

  constructor(private event: EventService) { }

  weave(target: any) {
    const constructor = getConstructor(target);
    throw new Error('Method not implemented.');
  }
}
