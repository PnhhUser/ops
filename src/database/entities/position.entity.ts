import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { DepartmentEntity } from './department.entity';

@Entity({ name: 'positions' })
export class PositionEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('varchar', { nullable: true })
  description: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  baseSalary: number | null;

  @OneToMany(() => EmployeeEntity, (employee) => employee.position)
  employees: EmployeeEntity[];

  @ManyToOne(() => DepartmentEntity, (department) => department.positions, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'departmentId' })
  department: DepartmentEntity | null;

  @RelationId((position: PositionEntity) => position.department)
  departmentId: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
