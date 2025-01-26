/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto.tsupdate-delivery.dto';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gaurds/roles.guards';
import { Roles, UserRole } from 'src/common/role.enum';

@Controller('deliveries')
export class DeliveryController {
  constructor(private readonly deliveriesService: DeliveryService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const delivery = await this.deliveriesService.findOne(id);
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return delivery;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    const delivery = await this.deliveriesService.findOne(id);
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return this.deliveriesService.update(id, updateDeliveryDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const delivery = await this.deliveriesService.findOne(id);
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return this.deliveriesService.remove(id);
  }
}
