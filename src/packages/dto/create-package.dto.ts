import { IsString, IsNumber, IsIn, IsNotEmpty } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsIn(['pending', 'in transit', 'delivered', 'returned'])
  status: 'pending' | 'in transit' | 'delivered' | 'returned';

  @IsNotEmpty()
  customerId: number;

  deliveryId?: number;
}
