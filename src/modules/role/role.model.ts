import { RoleEntity } from 'src/database/entities/role.entity';

export class RoleModel {
  id: number;
  name: string;
  key: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;

  static toModel(entity: RoleEntity | null): RoleModel {
    const model = new RoleModel();

    if (!entity) {
      return model;
    }

    model.id = entity.id;
    model.name = entity.name;
    model.key = entity.key;
    model.description = entity.description;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;

    return model;
  }

  static toModels(entities: RoleEntity[] | null): RoleModel[] {
    if (!entities) {
      return [];
    }

    return entities.map((entity) => {
      const model = new RoleModel();

      model.id = entity.id;
      model.name = entity.name;
      model.key = entity.key;
      model.description = entity.description;
      model.createdAt = entity.createdAt;
      model.updatedAt = entity.updatedAt;

      return model;
    });
  }
}
