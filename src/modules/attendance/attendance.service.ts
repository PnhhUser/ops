import { Inject, Injectable } from '@nestjs/common';
import { IAttendanceService } from './interface/IAttendanceService';
import { IAttendanceRepository } from 'src/database/repositories/interfaces/IAttendanceRepository';
import { AttendanceEntity } from 'src/database/entities/attendance.entity';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';
import { IEmployeeRepository } from 'src/database/repositories/interfaces/IEmployeeRepository';
import { EmployeeEntity } from 'src/database/entities/employee.entity';
import { CreateAttendanceDTO } from './attendance.dto';

@Injectable()
export class AttendanceService implements IAttendanceService<AttendanceEntity> {
  constructor(
    @Inject('IAttendanceRepository')
    private readonly attendanceRepository: IAttendanceRepository<AttendanceEntity>,
    @Inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository<EmployeeEntity>,
  ) {}

  async getAttendancesByEmployeeAndMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<AttendanceEntity[]> {
    if (!employeeId || employeeId <= 0) {
      throw ExceptionSerializer.badRequest('Invalid employeeId');
    }
    if (month < 1 || month > 12) {
      throw ExceptionSerializer.badRequest('Invalid month');
    }
    if (year < 1900 || year > new Date().getFullYear()) {
      throw ExceptionSerializer.badRequest('Invalid year');
    }

    const emp = await this.employeeRepository.getById(employeeId);

    if (!emp) {
      throw ExceptionSerializer.notFound('emp not exist');
    }

    return await this.attendanceRepository.getAttendancesByEmployeeAndMonth(
      employeeId,
      month,
      year,
    );
  }

  async createAttendance(dto: CreateAttendanceDTO): Promise<AttendanceEntity> {
    const entity = new AttendanceEntity();

    entity.date = dto.date;
    entity.checkInTime = dto.checkInTime;
    entity.checkOutTime = dto.checkOutTime;
    entity.status = dto.status;

    const empExist = await this.employeeRepository.getById(dto.employeeId);

    if (!empExist) {
      throw ExceptionSerializer.notFound('emp not exist');
    }

    const emp = new EmployeeEntity();
    emp.id = dto.employeeId;

    entity.employee = emp;

    await this.attendanceRepository.add(entity);

    return entity;
  }

  async createManyAttendances(
    dto: CreateAttendanceDTO[],
  ): Promise<AttendanceEntity[]> {
    if (!dto.length) {
      throw ExceptionSerializer.badRequest('No attendances provided');
    }

    // Lấy employeeId từ bản ghi đầu tiên
    const employeeId = dto[0].employeeId;

    // Kiểm tra nhân viên tồn tại
    const empExist = await this.employeeRepository.getById(employeeId);
    if (!empExist) {
      throw ExceptionSerializer.notFound('Employee not exist');
    }

    const emp = new EmployeeEntity();
    emp.id = employeeId;

    // Map dữ liệu sang entity
    const attendances: AttendanceEntity[] = dto.map((a) => {
      const entity = new AttendanceEntity();
      entity.date = a.date;
      entity.checkInTime = a.checkInTime;
      entity.checkOutTime = a.checkOutTime;
      entity.status = a.status;
      entity.employee = emp;
      return entity;
    });

    // Lưu nhiều bản ghi cùng lúc
    return await this.attendanceRepository.createManyAttendances(attendances);
  }

  async updateAttendance(
    attendance: AttendanceEntity,
  ): Promise<AttendanceEntity> {
    if (!attendance) {
      throw ExceptionSerializer.badRequest(
        'Attendance update data is required',
      );
    }

    if (!attendance.id || attendance.id <= 0) {
      throw ExceptionSerializer.badRequest('Invalid attendance ID');
    }

    const attendanceExist = await this.attendanceRepository.getById(
      attendance.id,
    );

    if (!attendanceExist) {
      throw ExceptionSerializer.notFound('Attendance not exist');
    }

    await this.attendanceRepository.update(attendance);

    return attendanceExist;
  }

  async deleteAttendance(id: number): Promise<void> {
    if (!id || id <= 0) {
      throw new Error('Invalid attendance ID');
    }
    await this.attendanceRepository.delete(id);
  }

  async countAbsencesByMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<number> {
    if (!employeeId || employeeId <= 0) {
      throw new Error('Invalid employeeId');
    }
    if (month < 1 || month > 12) {
      throw new Error('Invalid month');
    }
    if (year < 1900 || year > new Date().getFullYear()) {
      throw new Error('Invalid year');
    }
    return await this.attendanceRepository.countAbsencesByMonth(
      employeeId,
      month,
      year,
    );
  }

  async calculateTotalHoursByMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<number> {
    if (!employeeId || employeeId <= 0) {
      throw new Error('Invalid employeeId');
    }
    if (month < 1 || month > 12) {
      throw new Error('Invalid month');
    }
    if (year < 1900 || year > new Date().getFullYear()) {
      throw new Error('Invalid year');
    }
    return await this.attendanceRepository.calculateTotalHoursByMonth(
      employeeId,
      month,
      year,
    );
  }

  async countLateCheckInsByMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<number> {
    if (!employeeId || employeeId <= 0) {
      throw new Error('Invalid employeeId');
    }
    if (month < 1 || month > 12) {
      throw new Error('Invalid month');
    }
    if (year < 1900 || year > new Date().getFullYear()) {
      throw new Error('Invalid year');
    }

    return await this.attendanceRepository.countLateCheckInsByMonth(
      employeeId,
      month,
      year,
    );
  }
}
