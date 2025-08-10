import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  RelationId,
} from 'typeorm';
import { PositionEntity } from './position.entity';
import { Gender } from '../../common/constants/enums/employee.enum';
import { AccountEntity } from './account.entity';

@Entity({ name: 'employees' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string | null;

  @Column({ type: 'varchar', nullable: true })
  address: string | null;

  @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
  gender: Gender;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date | null;

  @ManyToOne(() => PositionEntity, (position) => position.employees, {
    nullable: true,
  })
  @JoinColumn({ name: 'positionId' })
  position: PositionEntity | null;

  @RelationId((employee: EmployeeEntity) => employee.position)
  positionId: number | null;

  @Column({ type: 'date', nullable: true })
  startDate: Date | null;

  @OneToOne(() => AccountEntity, (account) => account.employee, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'accountId' })
  account: AccountEntity | null;

  @RelationId((employee: EmployeeEntity) => employee.account)
  accountId: number | null;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
