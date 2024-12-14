/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Users } from './user.entity';
import { Delivery } from './delivery.entity';
import { Package } from './packages.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: `data/${configService.get('DB_NAME')}`,
        entities: [Users, Delivery, Package],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {}
