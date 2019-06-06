import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Event } from '../entities/event.entity';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  /**
   * Returns all events where their parent item is NOT deleted.
   * Also sort the results by event create date.
   */
  getAll() {
    return getConnection()
      .createQueryBuilder(Event, 'event')
      .innerJoinAndSelect('event.item', 'item', 'item.deleted_at IS NULL')
      .orderBy('event.created_at', 'ASC')
      .getMany();
  }
}
