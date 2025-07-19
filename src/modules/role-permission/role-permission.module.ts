import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionMappingEntity } from 'src/database/entities/role-permission-mapping.entity';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionRepository } from 'src/database/repositories/role-permission.repository';
import { RoleModule } from '../role/role.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RolePermissionMappingEntity]),
    RoleModule,
    PermissionModule,
  ],
  controllers: [RolePermissionController],
  providers: [
    { provide: 'IRolePermissionService', useClass: RolePermissionService },
    {
      provide: 'IRolePermissionRepository',
      useClass: RolePermissionRepository,
    },
  ],
})
export class RolePermissionModule {}
