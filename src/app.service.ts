import { Injectable } from '@nestjs/common';
import { ItemRepository} from './repositories/item.repository';
import { Item } from './entities/item.entity';

@Injectable()
export class AppService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async createItem(content: string): Promise<Item> {
    const item = this.itemRepository.create({ content })
    return this.itemRepository.save(item)
  }
}
