import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { OrderItemEntity } from './orderItem.entity';
import { OrderStatus } from 'src/common/constants/enums/production.enum';
import { DiscountEntity } from './discount.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity, { nullable: false })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @RelationId((order: OrderEntity) => order.customer)
  customerId: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalAmount: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  shippingAddress: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  paymentMethod: string | null;

  @Column({ type: 'text', nullable: true })
  note: string | null;

  @OneToMany(() => OrderItemEntity, (item) => item.order, {
    cascade: true,
  })
  items: OrderItemEntity[];

  @ManyToOne(() => DiscountEntity, { nullable: true })
  @JoinColumn({ name: 'discountId' })
  discount: DiscountEntity | null;

  @Column({ nullable: true })
  discountId: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
