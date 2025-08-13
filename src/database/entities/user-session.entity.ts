import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({ name: 'user_sessions' })
export class UserSessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'accountId' })
  account: AccountEntity;

  @Column({ type: 'varchar', length: 500, nullable: false })
  refreshToken: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  deviceInfo: string | null; // optional: lưu tên thiết bị, trình duyệt

  @Column({ type: 'varchar', length: 50, nullable: true })
  ipAddress: string | null; // địa chỉ IP khi đăng nhập

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string | null; // Quốc gia đăng nhập

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string | null; // Thành phố

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
