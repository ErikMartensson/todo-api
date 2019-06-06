import { Test, TestingModule } from '@nestjs/testing';
import { Chance } from 'chance';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const chance = new Chance();
jest.mock('./app.service');
const getAllItems = jest.fn();
const createItem = jest.fn();
const deleteItem = jest.fn();
const checkItem = jest.fn();
const uncheckItem = jest.fn();
const getAllEvents = jest.fn();
const getEventsForItem = jest.fn();

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: AppService,
        useValue: {
          getAllItems,
          createItem,
          deleteItem,
          checkItem,
          uncheckItem,
          getAllEvents,
          getEventsForItem,
        },
      }],
    }).compile();
  });

  describe('getAllItems', () => {
    it('works', async () => {
      const data = chance.string();
      getAllItems.mockResolvedValue([{ toDto: () => data }]);

      const appController = app.get<AppController>(AppController);
      expect(await appController.getAllItems()).toStrictEqual([data]);
    });
  });

  describe('createItem', () => {
    it('works', async () => {
      const content = chance.string();
      createItem.mockImplementation(input => Promise.resolve({
        toDto: () => ({ content: input }),
      }));

      const appController = app.get<AppController>(AppController);
      expect(await appController.createItem({ content })).toStrictEqual({ content });
    });
  });

  describe('deleteItem', () => {
    it('can return true', async () => {
      const success = true;
      deleteItem.mockResolvedValue(success);

      const appController = app.get<AppController>(AppController);
      expect(await appController.deleteItem(chance.string())).toEqual({ success });
    });

    it('can return false', async () => {
      const success = false;
      deleteItem.mockResolvedValue(success);

      const appController = app.get<AppController>(AppController);
      expect(await appController.deleteItem(chance.string())).toEqual({ success });
    });
  });

  describe('checkItem', () => {
    it('works', async () => {
      const id = chance.string();
      checkItem.mockImplementation(input => Promise.resolve({
        toDto: () => ({ id: input }),
      }));

      const appController = app.get<AppController>(AppController);
      expect(await appController.checkItem(id)).toStrictEqual({ id });
    });
  });

  describe('uncheckItem', () => {
    it('works', async () => {
      const id = chance.string();
      uncheckItem.mockImplementation(input => Promise.resolve({
        toDto: () => ({ id: input }),
      }));

      const appController = app.get<AppController>(AppController);
      expect(await appController.uncheckItem(id)).toStrictEqual({ id });
    });
  });

  describe('getAllEvents', () => {
    it('works', async () => {
      const data = chance.string();
      getAllEvents.mockResolvedValue([{ toDto: () => data }]);

      const appController = app.get<AppController>(AppController);
      expect(await appController.getAllEvents()).toStrictEqual([data]);
    });
  });

  describe('getEventsForItem', () => {
    it('works', async () => {
      const id = chance.string();
      getEventsForItem.mockImplementation(input => Promise.resolve([{
        toDto: () => ({ itemId: input }),
      }]));

      const appController = app.get<AppController>(AppController);
      expect(await appController.getEventsForItem(id)).toStrictEqual([{ itemId: id }]);
    });
  });
});
