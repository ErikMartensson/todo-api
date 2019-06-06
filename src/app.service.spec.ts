import { Test, TestingModule } from '@nestjs/testing';
import { Chance } from 'chance';
import { AppService } from './app.service';
import { ItemRepository } from './repositories/item.repository';
import { EventRepository } from './repositories/event.repository';
import { Item } from './entities/item.entity';
import { Event } from './entities/event.entity';

const chance = new Chance();
const itemFindById = jest.fn();
const itemGetAll = jest.fn();
const eventGetAll = jest.fn();

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: ItemRepository,
          useValue: {
            findById: itemFindById,
            getAll: itemGetAll,
          },
        },
        {
          provide: EventRepository,
          useValue: {
            getAll: eventGetAll,
          },
        },
      ],
    }).compile();
  });

  describe('getAllItems', () => {
    it('works', async () => {
      const item = new Item();
      item.id = chance.string();
      itemGetAll.mockResolvedValue([item])

      const appService = app.get<AppService>(AppService);
      expect(await appService.getAllItems()).toStrictEqual([item]);
    });
  });
});
