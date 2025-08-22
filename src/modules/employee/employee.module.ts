import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeEntity } from 'src/database/entities/employee.entity';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from 'src/database/repositories/employee.repository';
import { AccountEntity } from 'src/database/entities/account.entity';
import { PositionEntity } from 'src/database/entities/position.entity';
import { PositionModule } from '../position/position.module';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [
    AccountModule,
    PositionModule,
    TypeOrmModule.forFeature([EmployeeEntity, AccountEntity, PositionEntity]),
  ],
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'IEmployeeService',
      useClass: EmployeeService,
    },
    {
      provide: 'IEmployeeRepository',
      useClass: EmployeeRepository,
    },
  ],
  exports: ['IEmployeeService', 'IEmployeeRepository'],
})
export class EmployeeModule {}
