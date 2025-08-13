import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
@Entity({ name: 'inventory' })
export class InventoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column({ type: 'int' })
  quantity: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
