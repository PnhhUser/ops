import { PositionEntity } from 'src/database/entities/position.entity';

export class PositionModel {
  positionId: number;
  name: string;
  key: string;
  baseSalary: number | null;
  description: string | null;
  createAt: Date;
  updateAt: Date;

  static toModel(entity: PositionEntity | null): PositionModel {
    const model = new PositionModel();

    if (!entity) {
      return model;
    }

    model.positionId = entity.id;
    model.name = entity.name;
    model.key = entity.key;
    model.baseSalary = entity.baseSalary;
    model.description = entity.description;
    model.createAt = entity.createdAt;
    model.updateAt = entity.updatedAt;

    return model;
  }

  static toModels(entities: PositionEntity[] | null): PositionModel[] {
    if (!entities) {
      return [];
    }

    return entities.map((entity) => {
      const model = new PositionModel();

      model.positionId = entity.id;
      model.name = entity.name;
      model.key = entity.key;
      model.baseSalary = entity.baseSalary;
      model.description = entity.description;
      model.createAt = entity.createdAt;
      model.updateAt = entity.updatedAt;

      return model;
    });
  }
}
