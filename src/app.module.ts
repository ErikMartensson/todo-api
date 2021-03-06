import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemRepository } from './repositories/item.repository';
import { EventRepository } from './repositories/event.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      uuidExtension: 'pgcrypto',
    }),
    TypeOrmModule.forFeature([ItemRepository, EventRepository]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
