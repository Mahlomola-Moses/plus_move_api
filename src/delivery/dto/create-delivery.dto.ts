/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  surbub: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  areaCode: string;

  @IsIn([
    'Recieved',
    'Packaging',
    'Driver-assigned',
    'In-transit',
    'Shipped',
    'Returned',
  ])
  status:
    | 'Recieved'
    | 'Packaging'
    | 'Driver-assigned'
    | 'In-transit'
    | 'Returned'
    | 'Shipped';

  @IsNotEmpty()
  driverId: number | null;
}
