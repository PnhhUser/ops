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
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { IDepartmentService } from './interfaces/IDepartmentService';
import { responseSerialize } from 'src/common/serializers/response.serializer';
import { CreateDepartmentDTO } from './dto/create-department.dto';
import { UpdateDepartmentDTO } from './dto/update-department.dto';
import { DepartmentDTO } from './dto/department.dto';

@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentController {
  constructor(
    @Inject('IDepartmentService')
    private readonly departmentService: IDepartmentService,
  ) {}

  @Get()
  async departments() {
    const data = await this.departmentService.getDepartments();

    const model = DepartmentDTO.toModels(data);

    return responseSerialize(model, 'Successfully fetched department list');
  }

  @Post()
  async addDepartment(@Body() dto: CreateDepartmentDTO) {
    const created = await this.departmentService.addDepartment(dto);

    const model = DepartmentDTO.toModel(created);

    return responseSerialize(model, 'New department created successful');
  }

  @Put()
  async updateDepartment(@Body() dto: UpdateDepartmentDTO) {
    const updated = await this.departmentService.updateDepartment(dto);

    const model = DepartmentDTO.toModel(updated);

    return responseSerialize(model, 'Department updated successful');
  }

  @Delete(':id')
  async deleteDepartment(@Param('id') id: number) {
    await this.departmentService.removeDepartment(id);

    return responseSerialize({}, 'Department remove successful');
  }
}
