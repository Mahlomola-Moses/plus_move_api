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

  @IsIn(['Assigned', 'In progress', 'Completed', 'Returned'])
  status: 'Assigned' | 'In progress' | 'Completed' | 'Returned';

  @IsNotEmpty()
  driverId: number;
}
