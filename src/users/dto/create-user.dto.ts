/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'First Name of the user', example: 'John' })
  @IsNotEmpty()
  @Length(3, 50)
  firstName: string;

  @ApiProperty({ description: 'Last Name of the user', example: 'Doe' })
  @IsNotEmpty()
  @Length(3, 50)
  lastName: string;

  @ApiProperty({
    description: 'Email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'South African phone number',
    example: '8001015009087',
  })
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'SA ID or Passport',
    example: '8001015009087',
  })
  @IsNotEmpty()
  IDNumber: string;

  @ApiProperty({
    description: 'Type of SA ID',
    example: 'SA-ID',
  })
  @IsNotEmpty()
  IDType: string;

  @ApiProperty({
    description: 'Password for the user',
    example: 'StrongP@ssw0rd!',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User role',
    example: 'ADMIN | DRIVER | CUSTOMER',
  })
  @IsEnum(['ADMIN', 'DRIVER', 'CUSTOMER'], {
    message: 'Role must be one of ADMIN, DRIVER, CUSTOMER',
  })
  role: 'ADMIN' | 'DRIVER' | 'CUSTOMER';

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
