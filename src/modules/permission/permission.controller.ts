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
    return responseSerialize(data, 'Successfully fetched permission list');
  }

  @Delete(':id')
  async removePermission(@Param('id') id: number) {
    await this.permissionService.removePermission(id);

    return responseSerialize({}, 'Permission remove successful');
  }

  @Put()
  async updatePermission(@Body() updatePermission: UpdatePermissionDTO) {
    await this.permissionService.updatePermission(updatePermission);

    return responseSerialize({}, 'Permission updated successful');
  }

  @Post()
  async CreatePermission(@Body() createPermission: CreatePermissionDTO) {
    await this.permissionService.addPermission(createPermission);

    return responseSerialize({}, 'New permission created successful');
  }
}
