import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ItemRepository} from './repositories/item.repository';
import { EventRepository} from './repositories/event.repository';
import { Item } from './entities/item.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  async createItem(content: string): Promise<Item> {
    const item = await this.itemRepository.save(
      this.itemRepository.create({ content })
    );

    const event = await this.eventRepository.save(
      this.eventRepository.create({
        event: 'create',
        item,
      })
    );

    return item;
  }

  async deleteItem(id: string): Promise<boolean> {
    const item = await this.itemRepository.findOne({ id, deletedAt: null });
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    item.deletedAt = new Date();
    await this.itemRepository.save(item);

    const event = await this.eventRepository.save(
      this.eventRepository.create({
        event: 'delete',
        item,
      })
    );

    return true;
  }

  async checkItem(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    item.isChecked = true;
    return this.itemRepository.save(item);
  }

  async uncheckItem(id: string): Promise<Item> {
    const item = await this.itemRepository.findOne(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    item.isChecked = false;
    return this.itemRepository.save(item);
  }
}
