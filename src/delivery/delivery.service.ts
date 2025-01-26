/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Delivery } from 'src/db/entities/delivery.entity';
import { Repository } from 'typeorm';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto.tsupdate-delivery.dto';

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

  async findAll(): Promise<Delivery[]> {
    return this.deliveryRepository.find();
  }

  async findOne(id: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({ where: { id } });
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return delivery;
  }

  async update(
    id: number,
    updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    const delivery = await this.findOne(id); // Reuse the findOne method to check if the delivery exists
    const updatedDelivery = this.deliveryRepository.merge(
      delivery,
      updateDeliveryDto,
    );
    return this.deliveryRepository.save(updatedDelivery);
  }

  async remove(id: number): Promise<void> {
    const delivery = await this.findOne(id); // Reuse the findOne method to check if the delivery exists
    await this.deliveryRepository.remove(delivery);
  }
}
