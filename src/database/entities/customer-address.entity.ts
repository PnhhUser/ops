import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'customer_addresses' })
export class CustomerAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.addresses, {
    onDelete: 'CASCADE',
  })
  customer: CustomerEntity;

  @Column({ type: 'varchar', length: 255 })
  addressLine: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string | null;

  @UpdateDateColumn()
  updatedAt: Date;
}
