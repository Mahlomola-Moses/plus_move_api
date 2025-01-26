/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/DTO/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Users } from 'src/db/entities/user.entity';

@Injectable()
export class CustomersService {
  constructor(private userService: UsersService) {}

  public async getCustomerByIDNumber(IDNumber: string): Promise<any> {
    return await this.userService.getCustomerByIDNumber(IDNumber);
  }

  public async createCustomer(model: CreateUserDto): Promise<any> {
    model.role = 'CUSTOMER';
    return await this.userService.createUser(model);
  }

  public async updateCustomer(
    IDNumber: string,
    model: UpdateUserDto,
  ): Promise<any> {
    model.role = 'CUSTOMER';
    return await this.userService.updatetCustomer(IDNumber, model);
  }

  async customerByIDNumber(IDNumber: string): Promise<Users> {
    const user = await this.userService.getCustomerByIDNumber(IDNumber);
    if (!user) {
      throw new NotFoundException(`User with ID ${IDNumber} not found`);
    }
    return user;
  }

  async getCustomerByID(id: number): Promise<Users> {
    const user = await this.userService.getCustomerById(id);
    if (!user) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return user;
  }
}
