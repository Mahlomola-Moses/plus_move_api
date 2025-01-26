/* eslint-disable prettier/prettier */
// import { IsString, IsNotEmpty, IsIn } from 'class-validator';

// export class CreateDeliveryDto {
//   @IsString()
//   @IsNotEmpty()
//   street: string;

//   @IsString()
//   @IsNotEmpty()
//   surbub: string;

//   @IsString()
//   @IsNotEmpty()
//   city: string;

//   @IsString()
//   @IsNotEmpty()
//   areaCode: string;

//   @IsIn([
//     'Recieved',
//     'Packaging',
//     'Driver-assigned',
//     'In-transit',
//     'Shipped',
//     'Returned',
//   ])
//   status:
//     | 'Recieved'
//     | 'Packaging'
//     | 'Driver-assigned'
//     | 'In-transit'
//     | 'Returned'
//     | 'Shipped';

//   @IsNotEmpty()
//   driverId: number | null;
// }
import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @ApiProperty({
    description: 'The street address for the delivery',
    example: '123 Main St',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    description: 'The suburb for the delivery',
    example: 'Downtown',
  })
  @IsString()
  @IsNotEmpty()
  surbub: string;

  @ApiProperty({
    description: 'The city for the delivery',
    example: 'New York',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'The area code for the delivery',
    example: '10001',
  })
  @IsString()
  @IsNotEmpty()
  areaCode: string;

  @ApiProperty({
    description: 'The status of the delivery',
    enum: [
      'Recieved',
      'Packaging',
      'Driver-assigned',
      'In-transit',
      'Shipped',
      'Returned',
    ],
    example: 'Recieved',
  })
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

  @ApiProperty({
    description: 'The ID of the driver assigned to the delivery (can be null)',
    example: 1,
    nullable: true,
  })
  @IsNotEmpty()
  driverId: number | null;
  @ApiProperty({
    description: 'receiver Emails',
    example: 're@gmail.com',
  })
  @IsString()
  receiverEmails: string;
  @ApiProperty({
    description: 'receivers Phone Numbers',
    example: '0658119123',
  })
  @IsString()
  receiverPhoneNumbers: string;
}
