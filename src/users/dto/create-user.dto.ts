/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'First Name of the user', example: 'John' })
  @IsNotEmpty()
  @Length(3, 50)
  firstName: string;

  @ApiProperty({ description: 'Last Name of the user', example: 'Doe' })
  @IsNotEmpty()
  @Length(3, 50)
  lastName: string;

  @ApiProperty({ description: 'Email address', example: 'moses@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user',
    example: 'StrongP@ssw0rd!',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User role',
    example: 'Admin|driver|customer',
  })
  role: string;
}
