import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastSeen: Date | null;

  @OneToOne(() => EmployeeEntity, (employee) => employee.account)
  employee: EmployeeEntity;

  @ManyToOne(() => RoleEntity, (role) => role.accounts, {
    nullable: false,
    eager: true,
    onDelete: 'RESTRICT', // tránh xoá nhầm role
  })
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @RelationId((account: AccountEntity) => account.role)
  roleId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
