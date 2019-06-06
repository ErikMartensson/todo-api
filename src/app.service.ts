import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ItemRepository } from './repositories/item.repository';
import { EventRepository } from './repositories/event.repository';
import { Item } from './entities/item.entity';
import { Event } from './entities/event.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  async getAllItems(): Promise<Item[]> {
    return this.itemRepository.getAll();
  }

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
    const item = await this.itemRepository.findById(id);
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
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    // If this item is already checked, just return it.
    if (item.isChecked) {
      return item;
    }
    item.isChecked = true;
    await this.itemRepository.save(item);

    const event = await this.eventRepository.save(
      this.eventRepository.create({
        event: 'check',
        item,
      })
    );

    return item;
  }

  async uncheckItem(id: string): Promise<Item> {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    // If this item is already unchecked, just return it.
    if (!item.isChecked) {
      return item;
    }
    item.isChecked = false;
    await this.itemRepository.save(item);

    const event = await this.eventRepository.save(
      this.eventRepository.create({
        event: 'uncheck',
        item,
      })
    );

    return item;
  }

  async getAllEvents(): Promise<Event[]> {
    return this.eventRepository.getAll();
  }

  async getEventsForItem(id: string): Promise<Event[]> {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
    }
    return item.events;
  }
}
