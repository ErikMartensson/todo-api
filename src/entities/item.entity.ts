import { Entity, Column, PrimaryColumn, Generated, CreateDateColumn } from 'typeorm';
import { ItemDto } from '../dtos/item.dto';

@Entity()
export class Item {
  @PrimaryColumn()
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
