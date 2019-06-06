import { Entity,
  Column,
  PrimaryColumn,
  Generated,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ItemDto } from '../dtos/item.dto';
import { Event } from './event.entity';

@Entity()
export class Item {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column({
    name: 'is_checked',
    default: false,
    nullable: false,
  })
  isChecked: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date;

  @OneToMany(type => Event, event => event.item)
  events: Promise<Event[]>;

  toDto(): ItemDto {
    const { id, content, isChecked, createdAt } = this;
    return {
      id,
      content,
      isChecked,
      createdAt,
    };
  }
}
