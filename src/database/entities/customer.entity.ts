import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerAddressEntity } from './customer-address.entity';
import { CustomerGroupEntity } from './customer-group.entity';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  customerCode: string | null; // mã khách hàng, nếu cần

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Địa chỉ khách hàng
  @OneToMany(() => CustomerAddressEntity, (address) => address.customer)
  @JoinColumn({ name: 'customerId' })
  addresses: CustomerAddressEntity;

  @RelationId((customer: CustomerEntity) => customer.addresses)
  addressId: number;

  // Nhóm khách hàng
  @ManyToOne(() => CustomerGroupEntity, (group) => group.customers, {
    nullable: true,
  })
  @JoinColumn({ name: 'groupId' })
  group: CustomerGroupEntity;

  @RelationId((customer: CustomerEntity) => customer.group)
  groupId: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
