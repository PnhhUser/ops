import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { AttendanceEntity } from 'src/database/entities/attendance.entity';
import { IAttendanceService } from './interface/IAttendanceService';
import { CreateAttendanceDTO } from './attendance.dto';

@UseGuards(JwtAuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(
    @Inject('IAttendanceService')
    private readonly attendanceService: IAttendanceService<AttendanceEntity>,
  ) {}

  // Lấy danh sách chấm công theo nhân viên và tháng
  @Get('employee/:employeeId')
  async getAttendancesByEmployeeAndMonth(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ): Promise<AttendanceEntity[]> {
    return this.attendanceService.getAttendancesByEmployeeAndMonth(
      employeeId,
      month,
      year,
    );
  }

  // Tạo một bản ghi chấm công
  @Post()
  async createAttendance(
    @Body() dto: CreateAttendanceDTO,
  ): Promise<AttendanceEntity> {
    return this.attendanceService.createAttendance(dto);
  }

  // Tạo nhiều bản ghi chấm công
  @Post('bulk')
  async createManyAttendances(
    @Body() dto: CreateAttendanceDTO[],
  ): Promise<AttendanceEntity[]> {
    return this.attendanceService.createManyAttendances(dto);
  }

  // Cập nhật chấm công
  @Put()
  async updateAttendance(
    @Body() attendance: AttendanceEntity,
  ): Promise<AttendanceEntity | null> {
    return this.attendanceService.updateAttendance(attendance);
  }

  // Xóa chấm công
  @Delete(':id')
  async deleteAttendance(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.attendanceService.deleteAttendance(id);
  }

  // Đếm số ngày vắng trong tháng
  @Get('absences/:employeeId')
  async countAbsencesByMonth(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ): Promise<number> {
    return this.attendanceService.countAbsencesByMonth(employeeId, month, year);
  }

  // Tính tổng giờ làm việc trong tháng
  @Get('total-hours/:employeeId')
  async calculateTotalHoursByMonth(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ): Promise<number> {
    return this.attendanceService.calculateTotalHoursByMonth(
      employeeId,
      month,
      year,
    );
  }

  // Đếm số lần đi muộn trong tháng
  @Get('late-checkins/:employeeId')
  async countLateCheckInsByMonth(
    @Param('employeeId', ParseIntPipe) employeeId: number,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ): Promise<number> {
    return this.attendanceService.countLateCheckInsByMonth(
      employeeId,
      month,
      year,
    );
  }
}
