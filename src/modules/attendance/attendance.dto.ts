import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AttendanceStatus } from 'src/common/constants/enums/employee.enum';

// CREATE
export class CreateAttendanceDTO {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  checkInTime: string;

  @IsString()
  checkOutTime: string;

  @IsEnum(AttendanceStatus)
  @IsNotEmpty()
  status: AttendanceStatus;

  @IsNumber()
  @IsNotEmpty()
  employeeId: number;
}

// UPDATE
export class UpdateAttendanceDTO {
  @IsNumber()
  attendanceId: number;

  @IsString()
  date: string;

  @IsString()
  checkInTime: string | null;

  @IsString()
  checkOutTime: string | null;

  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @IsNumber()
  employeeId: number;
}
