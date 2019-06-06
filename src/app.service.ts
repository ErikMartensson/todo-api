import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ItemRepository} from './repositories/item.repository';
import { Item } from './entities/item.entity';

@Injectable()
export class AppService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async createItem(content: string): Promise<Item> {
    const item = this.itemRepository.create({ content })
    return this.itemRepository.save(item)
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
