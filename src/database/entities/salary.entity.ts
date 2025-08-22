import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity({ name: 'salaries' })
export class SalaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EmployeeEntity, { nullable: false })
  @JoinColumn({ name: 'employeeId' })
  employee: EmployeeEntity;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  baseSalary: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  bonus: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  deduction: number;

  @Column({ type: 'int', default: 0 })
  workingDays: number; // số ngày làm việc thực tế

  @Column({ type: 'int', default: 0 })
  leaveDays: number; // ngày nghỉ phép có lương

  @Column({ type: 'int', default: 0 })
  unpaidLeaveDays: number; // ngày nghỉ không lương

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  totalSalary: number;

  @Column({ type: 'int', default: 0 })
  overtimeDays: number; // số ngày làm thêm cuối tuần / lễ

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  overtimePay: number; // tiền OT tương ứng

  @Column({ type: 'int' })
  month: number;

  @Column({ type: 'int' })
  year: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

// totalSalary = (baseSalary / standardWorkingDays * workingDays) + bonus + overtimePay - deduction;
// standardWorkingDays = 22
// overtimePay = (baseSalary / standardWorkingDays) * overtimeDays * overtimeRate
// overtimeRate = 1.5
