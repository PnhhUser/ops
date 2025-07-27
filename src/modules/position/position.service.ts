import { Inject, Injectable } from '@nestjs/common';
import { CreatePositionDTO } from './dto/create-position.dto';
import { UpdatePositionDTO } from './dto/update-position.dto';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { IPositionService } from './interfaces/IPositionService';
import { PositionEntity } from 'src/database/entities/position.entity';
import { IPositionRepository } from 'src/database/repositories/interfaces/IPositionRepository';

@Injectable()
export class PositionService implements IPositionService<PositionEntity> {
  constructor(
    @Inject('IPositionRepository')
    private readonly positionRepository: IPositionRepository<PositionEntity>,
  ) {}

  async getPositions(): Promise<PositionEntity[] | null> {
    return await this.positionRepository.getAll();
  }

  async addPosition(newPosition: CreatePositionDTO) {
    const existed = await this.positionRepository.getByName(newPosition.name);

    if (existed) {
      throw ExceptionSerializer.conflict(
        ErrorMessages.position.POSITION_EXISTS,
      );
    }

    const created = CreatePositionDTO.toEntity(newPosition);

    await this.positionRepository.add(created);

    return created;
  }

  async updatePosition(position: UpdatePositionDTO) {
    const existed = await this.positionRepository.getById(position.positionId);

    if (!existed) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.position.POSITION_NOT_FOUND,
      );
    }

    const duplicatedUsername = await this.positionRepository.getByName(
      position.name,
    );

    if (duplicatedUsername && duplicatedUsername.id !== position.positionId) {
      throw ExceptionSerializer.conflict(
        ErrorMessages.position.POSITION_EXISTS,
      );
    }

    const updated = UpdatePositionDTO.toEntity(position);

    await this.positionRepository.update(updated);

    return updated;
  }

  async removePosition(positionId: number) {
    if (typeof positionId !== 'number') {
      throw ExceptionSerializer.badRequest(
        ErrorMessages.position.ID_NOT_INTEGER,
      );
    }

    if (positionId <= 0) {
      throw ExceptionSerializer.badRequest(ErrorMessages.position.ID_TOO_SMALL);
    }

    const existed = await this.positionRepository.getById(positionId);

    if (!existed) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.position.POSITION_NOT_FOUND,
      );
    }

    await this.positionRepository.delete(existed.id);
  }
}
