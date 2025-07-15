import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissionMappingEntity } from '../entities/role-permission-mapping.entity';
import { Repository } from 'typeorm';
import { IRolePermissionRepository } from './interfaces/IRolePermissionRepository';
import { PermissionEntity } from '../entities/permission.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolePermissionRepository
  implements IRolePermissionRepository<RolePermissionMappingEntity>
{
  constructor(
    @InjectRepository(RolePermissionMappingEntity)
    private readonly repository: Repository<RolePermissionMappingEntity>,
  ) {}

  async findMapping(
    roleId: number,
    permissionId: number,
  ): Promise<RolePermissionMappingEntity | null> {
    return await this.repository.findOne({
      where: { role: { id: roleId }, permission: { id: permissionId } },
    });
  }

  createMapping(
    roleId: number,
    permissionId: number,
  ): RolePermissionMappingEntity {
    return this.repository.create({
      role: { id: roleId },
      permission: { id: permissionId },
    });
  }

  async deleteAllRoleId(roleId: number): Promise<void> {
    await this.repository.delete({ role: { id: roleId } });
  }

  async save(
    entityOrEntities:
      | RolePermissionMappingEntity
      | RolePermissionMappingEntity[],
  ): Promise<void> {
    if (Array.isArray(entityOrEntities)) {
      await this.repository.save(entityOrEntities);
    } else {
      await this.repository.save(entityOrEntities);
    }
  }

  async deletePermission(roleId: number, permissionId: number): Promise<void> {
    await this.repository.delete({
      role: { id: roleId },
      permission: { id: permissionId },
    });
  }

  async getPermissionsByRole(roleId: number): Promise<PermissionEntity[]> {
    const mappings = await this.repository.find({
      where: { role: { id: roleId } },
    });

    return mappings.map((m) => m.permission);
  }
}
