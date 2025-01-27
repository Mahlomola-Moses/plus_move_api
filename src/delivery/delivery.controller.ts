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
  InternalServerErrorException,
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
  async create(@Body() createDeliveryDto: CreateDeliveryDto) {
    try {
      return await this.deliveriesService.create(createDeliveryDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create delivery');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll() {
    try {
      return await this.deliveriesService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch deliveries');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const delivery = await this.deliveriesService.findOne(id);
      if (!delivery) {
        throw new NotFoundException(`Delivery with ID ${id} not found`);
      }
      return delivery;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch delivery');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    try {
      const delivery = await this.deliveriesService.findOne(id);
      if (!delivery) {
        throw new NotFoundException(`Delivery with ID ${id} not found`);
      }
      return await this.deliveriesService.update(id, updateDeliveryDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update delivery');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const delivery = await this.deliveriesService.findOne(id);
      if (!delivery) {
        throw new NotFoundException(`Delivery with ID ${id} not found`);
      }
      return await this.deliveriesService.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete delivery');
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('/assign-driver/:id')
  async assignDriver(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    try {
      const delivery = await this.deliveriesService.findOne(id);
      if (!delivery) {
        throw new NotFoundException(`Delivery with ID ${id} not found`);
      }
      return await this.deliveriesService.update(id, updateDeliveryDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to assign driver');
    }
  }
}
