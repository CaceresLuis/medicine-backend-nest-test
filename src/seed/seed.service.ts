import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from 'src/medicines/entities/medicine.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicinesRepository: Repository<Medicine>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.clearTables();
    await this.insertUsers();
    await this.insertMedicine();

    return 'Seed success'
  }

  private async clearTables() {
    const queryMedicine =
      this.medicinesRepository.createQueryBuilder('medicine');
    const queryUser = this.userRepository.createQueryBuilder('user');
    await queryMedicine.delete().where({}).execute();
    await queryUser.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUser = initialData.users;
    const users: User[] = [];

    seedUser.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    await this.userRepository.save(users);
  }

  private async insertMedicine() {
    const seedMedicine = initialData.medicine;
    const medicines: Medicine[] = [];

    seedMedicine.forEach((medicine) => {
      medicines.push(this.medicinesRepository.create(medicine));
    });

    await this.medicinesRepository.save(medicines);
  }
}
