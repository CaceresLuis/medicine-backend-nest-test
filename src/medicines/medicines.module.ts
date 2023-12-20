import { Module } from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { MedicinesController } from './medicines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [MedicinesController],
  providers: [MedicinesService],
  imports: [TypeOrmModule.forFeature([Medicine]), AuthModule],
  exports: [TypeOrmModule]
})
export class MedicinesModule {}
