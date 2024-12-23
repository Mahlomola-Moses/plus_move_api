import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from 'src/db/entities/packages.entity';
import { Users } from 'src/db/entities/user.entity';
import { Delivery } from 'src/db/entities/delivery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Package, Users, Delivery])],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
