import { Entity,
  Column,
  PrimaryColumn,
  Generated,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EventDto } from '../dtos/event.dto';
import { Item } from './item.entity';

@Entity()
export class Event {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ length: 20 })
  event: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(type => Item, item => item.events)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  toDto(): EventDto {
    const { id, event, createdAt } = this;
    return {
      id,
      event,
      createdAt,
    };
  }
}
