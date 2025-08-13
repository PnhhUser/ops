import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'customer_groups' })
export class CustomerGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string; // tên nhóm, ví dụ "Công ty", "Đại lý"

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @OneToMany(() => CustomerEntity, (customer) => customer.group)
  customers: CustomerEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
