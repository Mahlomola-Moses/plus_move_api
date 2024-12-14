/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from './user.entity';
import { Package } from './packages.entity';

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  street: string;

  @Column({ type: 'varchar', length: 255 })
  surbub: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  areaCode: string;

  @Column({ type: 'varchar', length: 255 })
  status: 'Assigned' | 'In progress' | 'Completed' | 'Returned';

  @ManyToOne(() => Users, (user) => user.deliveries, { nullable: false })
  driver: Users;

  @OneToMany(() => Package, (pkg) => pkg.delivery)
  packages: Package[];
}
