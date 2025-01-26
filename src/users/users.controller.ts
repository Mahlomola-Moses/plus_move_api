/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Users } from 'src/db/entities/user.entity';
import { Roles, UserRole } from 'src/common/role.enum';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-auth.guard';
import { RolesGuard } from 'src/auth/gaurds/roles.guards';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const model = await this.usersService.createUser(createUserDto);
      return {
        message: 'User created successfully',
        data: model,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.DRIVER)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 201, description: 'User successfully fetched' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getUserByEmail(@Param('id') email: string): Promise<Users> {
    try {
      const model = await this.usersService.findOneByEmail(email);
      return model;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to fetch user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 201, description: 'User successfully fetched' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async all(): Promise<Users[]> {
    try {
      const model = await this.usersService.getALLUsers();
      return model;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to fetch user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
