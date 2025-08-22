import { CreateAttendanceDTO } from '../attendance.dto';

export interface IAttendanceService<T> {
  getAttendancesByEmployeeAndMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<T[]>;

  createAttendance(attendance: CreateAttendanceDTO): Promise<T>;

  createManyAttendances(attendances: CreateAttendanceDTO[]): Promise<T[]>;

  updateAttendance(attendance: T): Promise<T | null>;

  deleteAttendance(id: number): Promise<void>;

  countAbsencesByMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<number>;

  calculateTotalHoursByMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<number>;

  countLateCheckInsByMonth(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<number>;
}
