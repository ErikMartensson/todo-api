import { EntityRepository, Repository } from 'typeorm';
import { Item } from '../entities/item.entity';

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  findById(id: string) {
    return this.findOne({ id, deletedAt: null });
  }

  getAll() {
    return this.find({ deletedAt: null });
  }
}
