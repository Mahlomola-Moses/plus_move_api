/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from './user.entity';
import { Delivery } from './delivery.entity';

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'float' })
  weight: number;

  @Column({ type: 'varchar', length: 100 })
  destination: string;

  @Column({ type: 'varchar', length: 100 })
  status: 'Pending' | 'In transit' | 'Delivered';

  @ManyToOne(() => Users, (user) => user.packages, { nullable: false })
  customer: Users;

  @ManyToOne(() => Delivery, (delivery) => delivery.packages, {
    nullable: false,
  })
  delivery: Delivery;
}
