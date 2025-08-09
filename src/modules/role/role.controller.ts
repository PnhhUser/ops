import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
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
import { CreateRoleDTO } from './dto/create-role.dto';
import { responseSerialize } from 'src/common/serializers/response.serializer';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { RoleEntity } from 'src/database/entities/role.entity';
import { IRoleService } from './interfaces/IRoleService';
import { RoleModel } from './role.model';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(
    @Inject('IRoleService')
    private readonly roleService: IRoleService<RoleEntity>,
  ) {}

  @Get()
  async getRoles() {
    const data = await this.roleService.getRoles();

    const models = RoleModel.toModels(data);

    return responseSerialize(models, 'Successfully fetched role list');
  }

  @Post()
  async addRole(@Body() newRole: CreateRoleDTO) {
    const created = await this.roleService.addRole(newRole);

    const model = RoleModel.toModel(created);

    return responseSerialize(model, 'New role created successfully');
  }

  @Put()
  async updateRole(@Body() updateRole: UpdateRoleDTO) {
    const updated = await this.roleService.updateRole(updateRole);

    const model = RoleModel.toModel(updated);

    return responseSerialize(model, 'Role updated successfully');
  }

  @Delete(':id')
  async removeRole(@Param('id') id: number) {
    await this.roleService.removeRole(id);

    return responseSerialize({}, 'Role removed successfully');
  }
}
