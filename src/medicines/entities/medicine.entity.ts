import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column('double')
  sale_price: number;

  @Column('double')
  cost: number;

  @Column()
  supplier: string;

  @Column()
  stock: number;

  @BeforeInsert()
  checkBeforeInsert() {
    this.name = this.name.toLowerCase();
  }

  @BeforeUpdate()
  checkBeforeUpdate() {
    this.checkBeforeInsert();
  }
}
