/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Controller('deliveries')
export class DeliveryController {
  constructor(private readonly deliveriesService: DeliveryService) {}

  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }
}
