import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateItemDto, DeleteItemDto, ItemDto } from './dtos/item.dto';
import { Item } from './entities/item.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async postItem(@Body() createData: CreateItemDto): Promise<ItemDto> {
    const item = await this.appService.createItem(createData.content);
    return item.toDto();
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string): Promise<DeleteItemDto> {
    const success = await this.appService.deleteItem(id);
    return { success };
  }

  @Put(':id/check')
  async checkItem(@Param('id') id: string): Promise<ItemDto> {
    const item = await this.appService.checkItem(id);
    return item.toDto();
  }

  @Put(':id/uncheck')
  async uncheckItem(@Param('id') id: string): Promise<ItemDto> {
    const item = await this.appService.uncheckItem(id);
    return item.toDto();
  }
}
