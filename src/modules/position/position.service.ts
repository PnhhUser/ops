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
    const [existName, existKey] = await Promise.all([
      this.positionRepository.getByName(newPosition.name),
      this.positionRepository.getByKey(newPosition.key),
    ]);

    if (existName) {
      throw ExceptionSerializer.conflict(
        `Position name '${existName.name}' already exists`,
      );
    }

    if (existKey) {
      throw ExceptionSerializer.conflict(
        `Position key '${existKey.key}' already exists`,
      );
    }

    const created = CreatePositionDTO.toEntity(newPosition);

    await this.positionRepository.add(created);

    return await this.positionRepository.getById(created.id);
  }

  async updatePosition(dto: UpdatePositionDTO) {
    const existed = await this.positionRepository.getById(dto.positionId);

    if (!existed) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.position.POSITION_NOT_FOUND,
      );
    }

    const duplicate = await this.positionRepository.getByName(dto.name);

    if (duplicate) {
      const isSameNameButDifferentId = duplicate.id !== dto.positionId;

      if (isSameNameButDifferentId) {
        throw ExceptionSerializer.conflict('This position already exists');
      }
    }

    const updated = UpdatePositionDTO.toEntity(dto);

    await this.positionRepository.update(updated);

    return await this.positionRepository.getById(updated.id);
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
