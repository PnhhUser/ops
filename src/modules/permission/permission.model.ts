import { PermissionEntity } from 'src/database/entities/permission.entity';

export class PermissionModel {
  id: number;
  name: string;
  key: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;

  static toModel(entity: PermissionEntity | null): PermissionModel {
    const model = new PermissionModel();

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

  static toModels(entities: PermissionEntity[] | null): PermissionModel[] {
    if (!entities) {
      return [];
    }

    return entities.map((entity) => {
      const model = new PermissionModel();

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
