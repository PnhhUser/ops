import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/database/entities/account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from 'src/database/repositories/account.repository';
import { EmployeeEntity } from 'src/database/entities/employee.entity';
import { RoleEntity } from 'src/database/entities/role.entity';
import { RolePermissionMappingEntity } from 'src/database/entities/role-permission-mapping.entity';
import { PermissionEntity } from 'src/database/entities/permission.entity';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntity,
      EmployeeEntity,
      RoleEntity,
      PermissionEntity,
      RolePermissionMappingEntity,
    ]),
    RoleModule,
  ],
  controllers: [AccountController],
  providers: [
    {
      provide: 'IAccountService',
      useClass: AccountService,
    },
    {
      provide: 'IAccountRepository',
      useClass: AccountRepository,
    },
  ],
  exports: ['IAccountRepository', 'IAccountService'],
})
export class AccountModule {}
