// production.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ProductionStatus } from 'src/common/constants/enums/production.enum';
import { BrandEntity } from './brand.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 10 })
  code: string;

  @ManyToOne(() => CategoryEntity, (category) => category.productions, {
    nullable: false,
  })
  category: CategoryEntity;

  @RelationId((production: ProductEntity) => production.category)
  @JoinColumn({ name: 'categoryId' })
  categoryId: number;

  @ManyToOne(() => BrandEntity, { nullable: true })
  @JoinColumn({ name: 'brandId' })
  brand: BrandEntity;

  @RelationId((production: ProductEntity) => production.brand)
  brandId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  costPrice: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imgUrl: string | null;

  @Column({
    type: 'enum',
    enum: ProductionStatus,
    default: ProductionStatus.ACTIVE,
  })
  status: ProductionStatus;

  @Column({ type: 'varchar', length: 50, nullable: true, unique: true })
  barcode: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
