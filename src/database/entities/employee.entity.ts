import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { PositionEntity } from './position.entity';
import { Gender } from 'src/common/constants/enums/employee.enum';
import { AccountEntity } from './account.entity';

@Entity({ name: 'employees' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
  gender: Gender;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @ManyToOne(() => PositionEntity, (position) => position.employees, {
    nullable: true,
  })
  @JoinColumn({ name: 'positionId' })
  position: PositionEntity;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @OneToOne(() => AccountEntity, (account) => account.employee, {
    nullable: true,
  })
  @JoinColumn({ name: 'accountId' })
  account: AccountEntity;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
