import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateMedicineDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  sale_price: number;

  @IsNumber()
  @Min(1)
  cost: number;

  @IsString()
  @IsNotEmpty()
  supplier: string;

  @IsNumber()
  @Min(1)
  @IsPositive()
  stock: number;
}
