import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from 'src/database/entities/department.entity';
import { DepartmentService } from './department.service';
import { DepartmentRepository } from 'src/database/repositories/department.repository';
import { DepartmentController } from './department.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  controllers: [DepartmentController],
  providers: [
    {
      provide: 'IDepartmentService',
      useClass: DepartmentService,
    },
    {
      provide: 'IDepartmentRepository',
      useClass: DepartmentRepository,
    },
  ],
  exports: ['IDepartmentService', 'IDepartmentRepository'],
})
export class DepartmentModule {}
