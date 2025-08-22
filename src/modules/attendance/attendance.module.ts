import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from 'src/database/entities/attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceRepository } from 'src/database/repositories/attendance.repository';
import { EmployeeModule } from '../employee/employee.module';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceEntity]), EmployeeModule],
  controllers: [AttendanceController],
  providers: [
    {
      provide: 'IAttendanceService',
      useClass: AttendanceService,
    },
    {
      provide: 'IAttendanceRepository',
      useClass: AttendanceRepository,
    },
  ],
  exports: ['IAttendanceService', 'IAttendanceRepository'],
})
export class AttendanceModule {}
