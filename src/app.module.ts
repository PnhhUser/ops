import * as dotenv from 'dotenv';
import * as path from 'path';
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
import { AttendanceModule } from './modules/attendance/attendance.module';

const NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config({
  path: path.resolve(__dirname, `../environments/.env.${NODE_ENV}`),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, mysqlConfig],
      ignoreEnvFile: true,
    }),
    TypeOrmModule.forRootAsync(mysqlProvider),
    AuthModule,
    EmployeeModule,
    RolePermissionModule,
    DepartmentModule,
    AttendanceModule,
  ],
  providers: [],
})
export class AppModule {}
