import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/database/entities/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from 'src/database/repositories/role.repository';
import { AccountEntity } from 'src/database/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, AccountEntity])],
  controllers: [RoleController],
  providers: [
    { provide: 'IRoleService', useClass: RoleService },
    { provide: 'IRoleRepository', useClass: RoleRepository },
  ],
  exports: ['IRoleService', 'IRoleRepository'],
})
export class RoleModule {}
