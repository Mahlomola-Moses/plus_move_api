/* eslint-disable prettier/prettier */

//role.enum.ts
import { SetMetadata } from '@nestjs/common';

// User Role Enum
export enum UserRole {
  ADMIN = 'ADMIN',
  DRIVER = 'DRIVER',
  CUSTOMER = 'CUSTOMER',
}

// Role-based Decorator
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
