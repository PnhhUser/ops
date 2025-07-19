import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { PermissionEntity } from './permission.entity';

@Entity('role_permissions_mapping')
export class RolePermissionMappingEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => RoleEntity, (role) => role.permissions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @RelationId((mapping: RolePermissionMappingEntity) => mapping.role)
  roleId: number;

  @ManyToOne(() => PermissionEntity, (permission) => permission.roles, {
    eager: true, // tiện lợi khi load Role -> permissions
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'permissionId' })
  permission: PermissionEntity;

  @RelationId((mapping: RolePermissionMappingEntity) => mapping.permission)
  permissionId: number;
}
