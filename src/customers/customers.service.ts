/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/DTO/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class CustomersService {
  constructor(private userService: UsersService) {}

  public async getCustomerByIDNumber(IDNumber: string): Promise<any> {
    return await this.userService.getCustomers(IDNumber);
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
}
