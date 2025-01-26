/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsIn,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePackageDto {
  @ApiProperty({
    description: 'The description of the package',
    example: 'Fragile electronics',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'The weight of the package in kilograms',
    example: 2.5,
  })
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @ApiProperty({
    description: 'The destination address of the package',
    example: '123 Main St, New York, NY',
  })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({
    description: 'The status of the package',
    enum: ['Pending', 'In transit', 'Delivered'],
    example: 'Pending',
  })
  @IsIn(['Pending', 'In transit', 'Delivered'])
  @IsNotEmpty()
  status: 'Pending' | 'In transit' | 'Delivered';

  @ApiProperty({
    description: 'The ID of the customer (user) associated with the package',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({
    description:
      'The ID of the delivery associated with the package (optional)',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  deliveryId?: number;
}
