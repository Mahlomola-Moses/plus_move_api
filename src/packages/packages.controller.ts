/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  @ApiOperation({ summary: 'Add package for customer' })
  @ApiResponse({ status: 201, description: 'package successfully added' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  addCustomerPackage(@Body() createPackageDto: CreatePackageDto) {
    try {
      return this.packagesService.addCustomerPackage(createPackageDto);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
