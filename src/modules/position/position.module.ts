import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionEntity } from 'src/database/entities/position.entity';
import { PositionRepository } from 'src/database/repositories/position.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PositionEntity])],
  controllers: [PositionController],
  providers: [PositionService, PositionRepository],
  exports: [PositionRepository, PositionService],
})
export class PositionModule {}
