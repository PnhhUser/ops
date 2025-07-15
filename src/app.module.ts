import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';
import mysqlConfig from './config/mysql.config';

import { mysqlProvider } from './providers/mysql.provider';

import { AuthModule } from './modules/auth/auth.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { RolePermissionModule } from './modules/role-permission/role-permission.module';
import { DepartmentModule } from './modules/department/department.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, mysqlConfig],
      envFilePath: 'environments/.env.development',
    }),
    TypeOrmModule.forRootAsync(mysqlProvider),
    AuthModule,
    EmployeeModule,
    RolePermissionModule,
    DepartmentModule,
  ],
  providers: [],
})
export class AppModule {}
