/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/entities/db.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { PackagesModule } from './packages/packages.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    AuthModule,
    DbModule,
    UsersModule,
    CustomersModule,
    PackagesModule,
    DeliveryModule,
  ],
})
export class AppModule {}
