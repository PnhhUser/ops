import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from 'src/database/entities/position.entity';
import { PositionRepository } from 'src/database/repositories/position.repository';
import { DepartmentEntity } from 'src/database/entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PositionEntity, DepartmentEntity])],
  controllers: [PositionController],
  providers: [
    {
      provide: 'IPositionService',
      useClass: PositionService,
    },
    {
      provide: 'IPositionRepository',
      useClass: PositionRepository,
    },
  ],
  exports: ['IPositionRepository', 'IPositionService'],
})
export class PositionModule {}
