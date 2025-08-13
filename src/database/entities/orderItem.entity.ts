import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, { nullable: false })
  product: ProductEntity;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number; // giá lúc đặt hàng

  @UpdateDateColumn()
  updatedAt: Date;
}
