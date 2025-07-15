import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RolePermissionMappingEntity } from './role-permission-mapping.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  key: string; // create, read, update, delete

  @Column()
  name: string; // Ví dụ: "Tạo", "Đọc", "Sửa", "Xoá"

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @OneToMany(() => RolePermissionMappingEntity, (mapping) => mapping.permission)
  roles: RolePermissionMappingEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
