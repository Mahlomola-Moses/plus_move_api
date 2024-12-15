/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
  id: number;
  @ApiProperty({ description: 'First Name of the user', example: 'John' })
  @Length(3, 50)
  firstName?: string;

  @ApiProperty({ description: 'Last Name of the user', example: 'Doe' })
  @Length(3, 50)
  lastName?: string;

  @ApiProperty({
    description: 'Email address',
    example: 'john.doe@example.com',
  })
  email?: string;

  @ApiProperty({
    description: 'South African phone number',
    example: '8001015009087',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'SA ID or Passport',
    example: '8001015009087',
  })
  IDNumber?: string;

  @ApiProperty({
    description: 'Type of SA ID',
    example: 'SA-ID',
  })
  IDType?: string;

  @ApiProperty({
    description: 'Password for the user',
    example: 'StrongP@ssw0rd!',
  })
  password?: string;

  @ApiProperty({
    description: 'User role',
    example: 'ADMIN | DRIVER | CUSTOMER',
  })
  role?: 'ADMIN' | 'DRIVER' | 'CUSTOMER';

  @ApiProperty({
    description: 'Driver license',
    example: '6678shhh9',
  })
  @IsOptional()
  licenseNumber?: string;

  @ApiProperty({
    description: 'Flag for user registration',
    example: 1,
  })
  @IsOptional()
  isCustomerRegistered?: number;

  createdDate: Date;
}
