import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
  ) {}

  async create(createMedicineDto: CreateMedicineDto) {
    try {
      const medicine = this.medicineRepository.create(createMedicineDto);
      await this.medicineRepository.save(medicine);
      return medicine;
    } catch (error) {
      this.handlerException(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.medicineRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(name: string) {
    const query = this.medicineRepository.createQueryBuilder();
    const medicine: Medicine = await query
      .where('UPPER(name) =:name', { name: name.toLowerCase() })
      .getOne();

    if (!medicine)
      throw new NotFoundException(`The medicine with name ${name} not found`);

    return medicine;
  }

  async update(id: string, updateMedicineDto: UpdateMedicineDto) {
    const { units } = updateMedicineDto;
    const medicine = await this.medicineRepository.preload({
      id: id,
      ...updateMedicineDto,
    });

    if (!medicine)
      throw new NotFoundException(`The medicine with id ${id} not found`);

    medicine.stock = medicine.stock + units;
    return this.medicineRepository.save(medicine);
  }

  async remove(id: string) {
    const medicine = await this.medicineRepository.findOneBy({ id });
    if (!medicine)
      throw new NotFoundException(`The medicine with id ${id} not found`);

    await this.medicineRepository.remove(medicine);
  }

  private handlerException(error: any) {
    if (error.code === 'ER_DUP_ENTRY')
      throw new BadRequestException(error.sqlMessage);
  }
}
