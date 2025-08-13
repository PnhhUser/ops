import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { DiscountEntity } from './discount.entity';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'discount_usages' })
@Unique(['customer', 'discount'])
export class DiscountUsageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity, { nullable: false })
  customer: CustomerEntity;

  @ManyToOne(() => DiscountEntity, { nullable: false })
  discount: DiscountEntity;

  @CreateDateColumn()
  usedAt: Date;
}
