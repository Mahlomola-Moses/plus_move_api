/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../db/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  public async findOneByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  public async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    createUserDto.password = hashedPassword;

    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }

  public getALLUsers(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  public async getCustomerByIDNumber(
    IDNumber: string,
  ): Promise<Users | undefined> {
    const results = await this.usersRepository.findOne({
      where: { IDNumber: IDNumber, role: 'CUSTOMER' },
    });

    return results;
  }

  public async updatetCustomer(
    IDNumber: string,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<Users> {
    const user = await this.getCustomerByIDNumber(IDNumber);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = this.usersRepository.merge(user, updateUserDto);

    return this.usersRepository.save(updatedUser);
  }

  public async getCustomerById(id: number): Promise<Users | undefined> {
    const results = await this.usersRepository.findOne({
      where: { id: id, role: 'CUSTOMER' },
    });
    console.log(results);
    return results;
  }
}
