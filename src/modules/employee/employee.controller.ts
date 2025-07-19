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

    return responseSerialize(data, 'Successfully fetched employee list');
  }

  @Post()
  async createEmployye(@Body() newEmp: CreateEmployeeDTO) {
    await this.employeeService.addEmployee(newEmp);

    return responseSerialize({}, 'New Employee created successfully');
  }

  @Put()
  async updatePosition(@Body() emp: UpdateEmployeeDTO) {
    await this.employeeService.updateEmployee(emp);

    return responseSerialize({}, 'Employee update successful');
  }

  @Delete(':id')
  async removePosition(@Param('id') id: number) {
    await this.employeeService.removeEmployee(id);

    return responseSerialize({}, 'Employee remove successful');
  }
}
