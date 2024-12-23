/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from 'src/db/entities/delivery.entity';
import { Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    const newDelivery = this.deliveryRepository.create(createDeliveryDto);

    return this.deliveryRepository.save(newDelivery);
  }
}
