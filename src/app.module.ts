/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/entities/db.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, DbModule, UsersModule],
})
export class AppModule {}
