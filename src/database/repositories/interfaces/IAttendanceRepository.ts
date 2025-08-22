import { IBaseRepository } from './IBaseRepository';

export interface IAttendanceRepository<T> extends IBaseRepository<T> {
  // sửa thời gian vào
  updateCheckInTime(id: number, checkIn: Date): Promise<T | null>;

  // sửa thời gian ra
  updateCheckOutTime(id: number, checkOut: Date): Promise<T | null>;

  // xóa thông tin chấm công nhân viên, ngày
  deleteByEmployeeAndDate(employeeId: number, date: Date): Promise<void>;

  // tạo nhiều thông tin chấm công
  createManyAttendances(attendances: T[]): Promise<T[]>;

  // đếm số lần đi muộn theo tháng
  countLateCheckInsByMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<number>;

  // đếm số lần vắng mặt theo tháng
  countAbsencesByMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<number>;

  getAttendancesByEmployeeAndMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<T[]>;

  calculateTotalHoursByMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<number>;
}
