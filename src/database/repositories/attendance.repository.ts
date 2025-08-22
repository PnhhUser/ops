import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AttendanceEntity } from '../entities/attendance.entity';
import { Between, IsNull, MoreThan, Repository } from 'typeorm';
import { IAttendanceRepository } from './interfaces/IAttendanceRepository';
import { BaseRepository } from './base.repository';

@Injectable()
export class AttendanceRepository
  extends BaseRepository<AttendanceEntity>
  implements IAttendanceRepository<AttendanceEntity>
{
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly repo: Repository<AttendanceEntity>,
  ) {
    super(repo);
  }

  async createManyAttendances(
    attendances: AttendanceEntity[],
  ): Promise<AttendanceEntity[]> {
    return this.repo.save(attendances);
  }

  async deleteByEmployeeAndDate(employeeId: number, date: Date): Promise<void> {
    await this.repo.delete({
      employee: { id: employeeId },
      date: date.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
    });
  }

  async updateCheckInTime(
    id: number,
    checkIn: Date,
  ): Promise<AttendanceEntity | null> {
    await this.repo.update(id, {
      checkInTime: checkIn.toTimeString().split(' ')[0],
    });
    return this.repo.findOneBy({ id });
  }

  async updateCheckOutTime(
    id: number,
    checkOut: Date,
  ): Promise<AttendanceEntity | null> {
    await this.repo.update(id, {
      checkOutTime: checkOut.toTimeString().split(' ')[0],
    });
    return this.repo.findOneBy({ id });
  }

  async countLateCheckInsByMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<number> {
    const startDate = this.formatDate(new Date(year, month - 1, 1));
    const endDate = this.formatDate(new Date(year, month, 0));

    return this.repo.count({
      where: {
        employee: { id: employeeId },
        date: Between(startDate, endDate),
        checkInTime: MoreThan('08:00:00'),
      },
    });
  }

  async countAbsencesByMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<number> {
    const startDate = this.formatDate(new Date(year, month - 1, 1));
    const endDate = this.formatDate(new Date(year, month, 0));

    return this.repo.count({
      where: {
        employee: { id: employeeId },
        date: Between(startDate, endDate),
        checkInTime: IsNull(),
      },
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  async getAttendancesByEmployeeAndMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<AttendanceEntity[]> {
    const startDate = this.formatDate(new Date(year, month - 1, 1));
    const endDate = this.formatDate(new Date(year, month, 0));

    return await this.repo.find({
      where: {
        employee: { id: employeeId },
        date: Between(startDate, endDate),
      },
      order: { date: 'ASC' },
    });
  }

  async calculateTotalHoursByMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<number> {
    const startDate = this.formatDate(new Date(year, month - 1, 1));
    const endDate = this.formatDate(new Date(year, month, 0));

    const attendances = await this.repo.find({
      where: {
        employee: { id: employeeId },
        date: Between(startDate, endDate),
      },
    });

    let totalHours = 0;

    for (const att of attendances) {
      if (att.checkInTime && att.checkOutTime) {
        // Chuyển sang Date để tính toán
        const [inH, inM, inS] = att.checkInTime.split(':').map(Number);
        const [outH, outM, outS] = att.checkOutTime.split(':').map(Number);

        const checkIn = new Date(0, 0, 0, inH, inM, inS || 0);
        const checkOut = new Date(0, 0, 0, outH, outM, outS || 0);

        const diffMs = checkOut.getTime() - checkIn.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours > 0) {
          totalHours += diffHours;
        }
      }
    }

    return totalHours;
  }
}
