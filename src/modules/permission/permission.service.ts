import { Inject, Injectable } from '@nestjs/common';
import { IPermissionService } from './interface/IPermissionService';
import { PermissionEntity } from 'src/database/entities/permission.entity';
import { CreatePermissionDTO } from './dto/create-permission.dto';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { UpdatePermissionDTO } from './dto/update-permission.dto';
import { IPermissionRepository } from 'src/database/repositories/interfaces/IPermissionRepository';

@Injectable()
export class PermissionService implements IPermissionService<PermissionEntity> {
  constructor(
    @Inject('IPermissionRepository')
    private readonly permissionRepository: IPermissionRepository<PermissionEntity>,
  ) {}

  async getPermissions(): Promise<PermissionEntity[]> {
    return await this.permissionRepository.getAll();
  }

  async addPermission(newPermission: CreatePermissionDTO) {
    const keyExists = await this.permissionRepository.getByKey(
      newPermission.key,
    );

    if (keyExists) {
      throw ExceptionSerializer.conflict(
        ErrorMessages.permission.PERMISSION_EXISTS,
      );
    }

    const created = CreatePermissionDTO.toEntity(newPermission);

    await this.permissionRepository.add(created);

    return await this.permissionRepository.getById(created.id);
  }

  async updatePermission(updatePermission: UpdatePermissionDTO) {
    const permissionExists = await this.permissionRepository.getById(
      updatePermission.permissionId,
    );

    if (!permissionExists) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.permission.PERMISSION_NOT_FOUND,
      );
    }

    const keyExists = await this.permissionRepository.getByKey(
      updatePermission.key,
    );

    if (keyExists && keyExists.id !== updatePermission.permissionId) {
      throw ExceptionSerializer.conflict(
        ErrorMessages.permission.PERMISSION_EXISTS,
      );
    }

    const updated = UpdatePermissionDTO.toEntity(updatePermission);

    await this.permissionRepository.update(updated);

    return await this.permissionRepository.getById(updated.id);
  }

  async removePermission(permissionId: number): Promise<void> {
    if (typeof permissionId !== 'number') {
      throw ExceptionSerializer.badRequest(
        ErrorMessages.permission.ID_NOT_INTEGER,
      );
    }

    if (permissionId <= 0) {
      throw ExceptionSerializer.badRequest(
        ErrorMessages.permission.ID_TOO_SMALL,
      );
    }

    const permissionExists =
      await this.permissionRepository.getById(permissionId);

    if (!permissionExists) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.permission.PERMISSION_NOT_FOUND,
      );
    }

    await this.permissionRepository.delete(permissionId);
  }
}
