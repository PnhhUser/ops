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
import { PermissionService } from './permission.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { responseSerialize } from 'src/common/serializers/response.serializer';
import { UpdatePermissionDTO } from './dto/update-permission.dto';
import { CreatePermissionDTO } from './dto/create-permission.dto';
import { PermissionModel } from './permission.model';

@UseGuards(JwtAuthGuard)
@Controller('permissions')
export class PermissionController {
  constructor(
    @Inject('IPermissionService')
    private readonly permissionService: PermissionService,
  ) {}

  @Get()
  async getPermissions() {
    const data = await this.permissionService.getPermissions();

    const model = PermissionModel.toModels(data);

    return responseSerialize(model, 'Successfully fetched permission list');
  }

  @Delete(':id')
  async removePermission(@Param('id') id: number) {
    await this.permissionService.removePermission(id);

    return responseSerialize({}, 'Permission remove successful');
  }

  @Put()
  async updatePermission(@Body() updatePermission: UpdatePermissionDTO) {
    const updated =
      await this.permissionService.updatePermission(updatePermission);

    const model = PermissionModel.toModel(updated);

    return responseSerialize(model, 'Permission updated successful');
  }

  @Post()
  async CreatePermission(@Body() createPermission: CreatePermissionDTO) {
    const created =
      await this.permissionService.addPermission(createPermission);

    const model = PermissionModel.toModel(created);

    return responseSerialize(model, 'New permission created successful');
  }
}
