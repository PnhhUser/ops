import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/database/entities/account.entity';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from 'src/database/repositories/account.repository';
import { EmployeeEntity } from 'src/database/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, EmployeeEntity])],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
  exports: [AccountRepository, AccountService],
})
export class AccountModule {}
