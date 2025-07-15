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

    return responseSerialize(data, 'Successfully fetched department list');
  }

  @Post()
  async addDepartment(@Body() dto: CreateDepartmentDTO) {
    await this.departmentService.addDepartment(dto);

    return responseSerialize({}, 'New department created successful');
  }

  @Put()
  async updateDepartment(@Body() dto: UpdateDepartmentDTO) {
    await this.departmentService.updateDepartment(dto);

    return responseSerialize({}, 'Department updated successful');
  }

  @Delete(':id')
  async deleteDepartment(@Param('id') id: number) {
    await this.departmentService.removeDepartment(id);

    return responseSerialize({}, 'Department remove successful');
  }
}
