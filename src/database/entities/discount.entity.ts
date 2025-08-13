import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'discounts' })
export class DiscountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  code: string; // Mã giảm giá, ví dụ: "SUMMER2025"

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  percentage: number; // Phần trăm giảm, ví dụ: 15.00 (15%)

  @Column({ type: 'int', nullable: true })
  usageLimit: number | null; // Số lần được dùng

  @Column({ type: 'int', default: 0 })
  usedCount: number; // Đếm số lần đã dùng

  @Column({ type: 'timestamp', nullable: true })
  validFrom: Date | null; // Bắt đầu có hiệu lực

  @Column({ type: 'timestamp', nullable: true })
  validTo: Date | null; // Hết hạn

  @Column({ type: 'boolean', default: true })
  isActive: boolean; // Trạng thái kích hoạt mã

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
