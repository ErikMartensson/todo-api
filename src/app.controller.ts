import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateItemDto, ItemDto } from './dtos/item.dto';
import { Item } from './entities/item.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async postItem(@Body() createData: CreateItemDto): Promise<ItemDto> {
    const item = await this.appService.createItem(createData.content);
    return item.toDto();
  }
}
