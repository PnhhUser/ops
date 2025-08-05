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

  override async getAll(): Promise<PositionEntity[]> {
    return this.repository.find({
      relations: {
        department: true,
      },
    });
  }

  override async getById(id: number): Promise<PositionEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: { department: true },
    });
  }

  async getByName(name: string): Promise<PositionEntity | null> {
    return await this.repository.findOneBy({ name });
  }

  async getByKey(key: string): Promise<PositionEntity | null> {
    return await this.repository.findOneBy({ key });
  }
}
