/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from 'src/db/entities/packages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
    private customersService: CustomersService,
  ) {}

  async addCustomerPackage(
    createPackageDto: CreatePackageDto[],
  ): Promise<any> {}
}
