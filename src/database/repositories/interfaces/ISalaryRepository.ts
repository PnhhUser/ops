import { IBaseRepository } from './IBaseRepository';
export interface ISalaryRepository<T> extends IBaseRepository<T> {
  // Lấy bảng lương của 1 nhân viên trong 1 tháng/năm
  findSalaryByEmployeeAndDate(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<T | null>;

  // Lấy tất cả bảng lương trong 1 tháng/năm
  findAllByMonthAndYear(month: number, year: number): Promise<T[]>;

  // Kiểm tra sự tồn tại của bảng lương
  existsByEmployeeAndDate(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<boolean>;

  // Xóa bảng lương của 1 nhân viên trong 1 tháng/năm
  deleteByEmployeeAndDate(
    employeeId: number,
    month: number,
    year: number,
  ): Promise<void>;

  // thống kê tổng lương
  calculateTotalPayroll(month: number, year: number): Promise<number>;
}
