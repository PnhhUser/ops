import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolePermissionService } from './role-permission.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { responseSerialize } from 'src/common/serializers/response.serializer';
import { RolePermissionDTO } from './dto/role-permission.dto';

@UseGuards(JwtAuthGuard)
@Controller('role-permission')
export class RolePermissionController {
  constructor(
    @Inject('IRolePermissionService')
    private readonly rolePermissionService: RolePermissionService,
  ) {}

  @Get('role/:roleId/permissions')
  async getPermissionsByRole(@Param('roleId') roleId: number) {
    const data = await this.rolePermissionService.getPermissionsByRole(roleId);
    return responseSerialize(data, 'Successfully fetched permission list');
  }

  @Put()
  async updateRolePermission(@Body() dto: RolePermissionDTO) {
    const mapping = await this.rolePermissionService.updatePermissionsForRole(
      dto.roleId,
      dto.permissionIds,
    );

    return responseSerialize(
      mapping,
      'Updated permissions for role successfully',
    );
  }

  @Put('saved')
  async saveRolePermissions(@Body() dto: RolePermissionDTO) {
    const mapping = await this.rolePermissionService.saveRolePermissions(
      dto.roleId,
      dto.permissionIds,
    );

    return responseSerialize(
      mapping,
      'Saved permissions for role successfully',
    );
  }

  @Post()
  async assign(@Body() dto: RolePermissionDTO) {
    const mapping = await this.rolePermissionService.assignPermissions(
      dto.roleId,
      dto.permissionIds,
    );

    return responseSerialize(mapping, 'Permissions assigned successfully');
  }

  @Delete(':roleId/:permissionId')
  async removePermission(
    @Param('roleId') roleId: number,
    @Param('permissionId') permissionId: number,
  ) {
    await this.rolePermissionService.removePermission(roleId, permissionId);
    return responseSerialize({}, 'Permission removed successfully');
  }
}
