import { AttendanceStatus } from 'src/common/constants/enums/employee.enum';

export class AttendanceModel {
  attendanceId: number;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: AttendanceStatus;
  employeeId: number;
  createdAt: Date;
  updatedAt: Date;
}
