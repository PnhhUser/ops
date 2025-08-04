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
import { responseSerialize } from 'src/common/serializers/response.serializer';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import { IEmployeeService } from './interface/IEmployeeService';
import { EmployeeModel } from './employee.model';

@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeeController {
  constructor(
    @Inject('IEmployeeService')
    private readonly employeeService: IEmployeeService,
  ) {}

  @Get()
  async employees() {
    const data = await this.employeeService.getEmployees();

    const models = EmployeeModel.toModels(data);

    return responseSerialize(models, 'Successfully fetched employee list');
  }

  @Post()
  async createEmployye(@Body() newEmp: CreateEmployeeDTO) {
    const created = await this.employeeService.addEmployee(newEmp);

    const model = EmployeeModel.toModel(created);

    return responseSerialize(model, 'New Employee created successfully');
  }

  @Put()
  async updatePosition(@Body() emp: UpdateEmployeeDTO) {
    const updated = await this.employeeService.updateEmployee(emp);

    const model = EmployeeModel.toModel(updated);

    return responseSerialize(model, 'Employee update successful');
  }

  @Delete(':id')
  async removePosition(@Param('id') id: number) {
    await this.employeeService.removeEmployee(id);

    return responseSerialize({}, 'Employee remove successful');
  }
}
