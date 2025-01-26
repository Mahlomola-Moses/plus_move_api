/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from 'src/db/entities/packages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from '../customers/customers.service';
import { UpdatePackageDto } from './dto/update-package.dto';
import { DeliveryService } from 'src/delivery/delivery.service';
import { Delivery } from 'src/db/entities/delivery.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
    private customersService: CustomersService,
    private deliveryService: DeliveryService,
  ) {}

  // Create: Add a new package

  async addCustomerPackage(
    createPackageDto: CreatePackageDto,
  ): Promise<Package> {
    // Check if the customer exists
    const customer = await this.customersService.getCustomerByID(
      createPackageDto.customerId,
    );
    if (!customer) {
      throw new NotFoundException(
        `Customer with ID ${createPackageDto.customerId} not found`,
      );
    }

    // Check if the delivery exists (if deliveryId is provided)
    let delivery: Delivery | null = null;
    if (createPackageDto.deliveryId) {
      delivery = await this.deliveryService.findOne(
        createPackageDto.deliveryId,
      );
      if (!delivery) {
        throw new NotFoundException(
          `Delivery with ID ${createPackageDto.deliveryId} not found`,
        );
      }
    }

    // Create a new package
    const newPackage = this.packageRepository.create({
      description: createPackageDto.description,
      weight: createPackageDto.weight,
      destination: createPackageDto.destination,
      status: createPackageDto.status,
      customer, // Associate the package with the customer
      delivery, // Associate the package with the delivery (if provided)
    });

    // Save the package to the database
    return this.packageRepository.save(newPackage);
  }

  // Read: Fetch all packages
  async findAll(): Promise<Package[]> {
    return this.packageRepository.find({ relations: ['customer', 'delivery'] }); // Include customer details
  }

  // Read: Fetch a single package by ID
  async findOne(id: number): Promise<Package> {
    const packageEntity = await this.packageRepository.findOne({
      where: { id },
      relations: ['customer'], // Include customer details
    });
    if (!packageEntity) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return packageEntity;
  }

  // Update: Modify an existing package
  async update(
    id: number,
    updatePackageDto: UpdatePackageDto,
  ): Promise<Package> {
    const packageEntity = await this.findOne(id); // Check if the package exists

    // Update the package fields
    const updatedPackage = this.packageRepository.merge(
      packageEntity,
      updatePackageDto,
    );

    // Save the updated package to the database
    return this.packageRepository.save(updatedPackage);
  }

  // Delete: Remove a package
  async remove(id: number): Promise<void> {
    const packageEntity = await this.findOne(id); // Check if the package exists
    await this.packageRepository.remove(packageEntity);
  }
}
