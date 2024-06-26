import { Controller, Param, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { filter, fromEvent, map, Observable } from 'rxjs';

@Controller('notifications')
export class FollowController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Sse('follow/:id')
  sse(@Param('id') id: string): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'follow').pipe(
      filter(
        (data: { followerId: string; followingId: string }) =>
          data.followerId === id || data.followingId! === id,
      ),
      map((data) => {
        return new MessageEvent('message', { data });
      }),
    );
  }
}
