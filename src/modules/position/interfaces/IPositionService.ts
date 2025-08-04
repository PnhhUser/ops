import { CreatePositionDTO } from '../dto/create-position.dto';
import { UpdatePositionDTO } from '../dto/update-position.dto';

export interface IPositionService<T> {
  getPositions(): Promise<T[] | null>;

  addPosition(newPosition: CreatePositionDTO): Promise<T | null>;

  updatePosition(position: UpdatePositionDTO): Promise<T | null>;

  removePosition(positionId: number): Promise<void>;
}
