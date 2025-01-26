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

  public async getDriverWithLeastPackages(): Promise<Users | undefined> {
    return undefined;
  }

  private async findDriverWithLeastDeliveriesx(): Promise<Users> {
    const drivers = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.deliveries', 'delivery')
      .where('user.role = :role', { role: 'DRIVER' }) // Assuming 'driver' is the role for drivers
      .getMany();

    if (drivers.length === 0) {
    }

    // Find the driver with the least number of deliveries
    const driverWithLeastDeliveries = drivers.reduce((prev, curr) =>
      prev.deliveries.length < curr.deliveries.length ? prev : curr,
    );

    return driverWithLeastDeliveries;
  }

  public async findDriverWithLeastDeliveries(): Promise<Users | null> {
    const subQuery = this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.deliveries', 'delivery')
      .select('user.id', 'id')
      .addSelect('COUNT(delivery.id)', 'deliveryCount')
      .where('user.role = :role', { role: 'DRIVER' })
      .groupBy('user.id');

    const driverWithLeastDeliveries = await this.usersRepository
      .createQueryBuilder('user')
      .where(`user.id IN (${subQuery.clone().select('user.id').getQuery()})`)
      .setParameters(subQuery.getParameters())
      .orderBy(
        `(${subQuery.clone().select('COUNT(delivery.id)').getQuery()})`,
        'ASC',
      )
      .limit(1)
      .leftJoinAndSelect('user.deliveries', 'delivery')
      .getOne();

    return driverWithLeastDeliveries || null;
  }
}
