/* eslint-disable prettier/prettier */
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gaurds/roles.guards';
import { Roles, UserRole } from 'src/common/role.enum';
import { CustomersService } from './customers.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';

import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/DTO/create-user.dto';
import { validate } from 'class-validator';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':IDNumber')
  @ApiOperation({ summary: 'Get user by ID/Passport number' })
  @ApiResponse({ status: 200, description: 'User successfully fetched' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async getCustomer(@Param('IDNumber') IDNumber: string): Promise<any> {
    try {
      const model = await this.customersService.getCustomerByIDNumber(IDNumber);
      return {
        data: model,
        message: !model ? 'Customer not found' : 'Cutomer found',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to fetch customer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async createCustomer(@Body() createCustomerDto: CreateUserDto): Promise<any> {
    try {
      console.log('Create a new customer');
      const createdCustomer =
        await this.customersService.createCustomer(createCustomerDto);
      return createdCustomer;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to create customer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':IDNumber')
  @ApiOperation({ summary: 'Update customer by ID/Passport number' })
  @ApiResponse({ status: 200, description: 'Customer successfully updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async updateCustomer(
    @Param('IDNumber') IDNumber: string,
    @Body() updateCustomerDto: UpdateUserDto,
  ): Promise<any> {
    try {
      const updatedCustomer = await this.customersService.updateCustomer(
        IDNumber,
        updateCustomerDto,
      );
      return updatedCustomer;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to update customer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
