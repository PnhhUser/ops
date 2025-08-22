import { AttendanceStatus } from 'src/common/constants/enums/employee.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity({ name: 'attendances' })
@Index(['employee', 'date'], { unique: true })
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EmployeeEntity, { nullable: false })
  @JoinColumn({ name: 'employeeId' })
  employee: EmployeeEntity;

  @Column({ type: 'date' })
  date: string; // YYYY-MM-DD

  @Column({ type: 'time', nullable: true })
  checkInTime: string; // HH:mm:ss

  @Column({ type: 'time', nullable: true })
  checkOutTime: string; // HH:mm:ss

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.PRESENT,
  })
  status: AttendanceStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
