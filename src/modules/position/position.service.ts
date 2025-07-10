import { Injectable } from '@nestjs/common';
import { PositionRepository } from 'src/database/repositories/position.repository';
import { CreatePositionDTO } from './dto/create-position.dto';
import { UpdatePositionDTO } from './dto/update-position.dto';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';

@Injectable()
export class PositionService {
  constructor(private readonly positionRepository: PositionRepository) {}

  async getPositions() {
    return await this.positionRepository.getAll();
  }

  async addPosition(newPosition: CreatePositionDTO) {
    const existed = await this.positionRepository.positionExist(
      newPosition.name,
    );

    if (existed) {
      throw ExceptionSerializer.conflict('Username already exists');
    }

    const position = CreatePositionDTO.toEntity(newPosition);

    await this.positionRepository.add(position);
  }

  async updatePosition(position: UpdatePositionDTO) {
    const existed = await this.positionRepository.getById(position.positionId);

    if (!existed) {
      throw ExceptionSerializer.notFound('Account not found');
    }

    const duplicatedUsername = await this.positionRepository.positionExist(
      position.name,
    );

    if (duplicatedUsername && duplicatedUsername.id !== position.positionId) {
      throw ExceptionSerializer.conflict('Username already exists');
    }

    const newPosition = UpdatePositionDTO.toEntity(position);

    await this.positionRepository.update(newPosition);
  }

  async removePosition(positionId: number) {
    const existed = await this.positionRepository.getById(positionId);

    if (!existed) {
      throw ExceptionSerializer.notFound('Account not found');
    }

    await this.positionRepository.delete(existed.id);
  }
}
