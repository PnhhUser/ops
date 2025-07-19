import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RolePermissionMappingEntity } from './role-permission-mapping.entity';
import { AccountEntity } from './account.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  key: string; // admin, user

  @Column()
  name: string; // Quản trị viên, Người dùng

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @OneToMany(() => AccountEntity, (account) => account.role)
  accounts: AccountEntity[];

  @OneToMany(() => RolePermissionMappingEntity, (mapping) => mapping.role, {
    cascade: true,
  })
  permissions: RolePermissionMappingEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
