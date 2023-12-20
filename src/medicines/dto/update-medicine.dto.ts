import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicineDto } from './create-medicine.dto';
import { IsNumber, IsPositive, Min } from 'class-validator';

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {
  @IsNumber()
  @Min(1)
  @IsPositive()
  units: number;
}
