import { Injectable } from '@nestjs/common';
import { BaseRepository } from './base.repository';
import { PositionEntity } from '../entities/position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPositionRepository } from './interfaces/IPositionRepository';
@Injectable()
export class PositionRepository
  extends BaseRepository<PositionEntity>
  implements IPositionRepository<PositionEntity>
{
  constructor(
    @InjectRepository(PositionEntity) repo: Repository<PositionEntity>,
  ) {
    super(repo);
  }

  async getByName(name: string): Promise<PositionEntity | null> {
    return await this.repository.findOneBy({ name });
  }
}
