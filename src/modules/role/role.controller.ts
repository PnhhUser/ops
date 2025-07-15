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

    return responseSerialize(data, 'Successfully fetched role list');
  }

  @Post()
  async addRole(@Body() newRole: CreateRoleDTO) {
    await this.roleService.addRole(newRole);

    return responseSerialize({}, 'New role created successfully');
  }

  @Put()
  async updateRole(@Body() updateRole: UpdateRoleDTO) {
    await this.roleService.updateRole(updateRole);

    return responseSerialize({}, 'Role updated successfully');
  }

  @Delete(':id')
  async removeRole(@Param('id') id: number) {
    await this.roleService.removeRole(id);

    return responseSerialize({}, 'Role removed successfully');
  }
}
