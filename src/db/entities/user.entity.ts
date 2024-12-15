/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Delivery } from './delivery.entity';
import { Package } from './packages.entity';
import { IsEmail } from 'class-validator';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  IDNumber: string;

  @Column({ type: 'varchar', length: 20 })
  IDType: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  role: 'ADMIN' | 'DRIVER' | 'CUSTOMER';

  @Column({ nullable: true })
  licenseNumber?: string;

  @Column({ default: 0 })
  isCustomerRegistered?: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate?: Date;

  @OneToMany(() => Package, (pkg) => pkg.customer)
  packages: Package[];

  @OneToMany(() => Delivery, (delivery) => delivery.driver)
  deliveries: Delivery[];
}
