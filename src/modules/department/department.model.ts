import { DepartmentEntity } from 'src/database/entities/department.entity';

export class DepartmentModel {
  departmentId: number;
  name: string;
  key: string;
  description: string | null;
  createAt: Date;
  updateAt: Date;

  static toModel(entity: DepartmentEntity | null): DepartmentModel {
    const model = new DepartmentModel();

    if (!entity) {
      return model;
    }

    model.departmentId = entity.id;
    model.name = entity.name;
    model.key = entity.key;
    model.description = entity.description;
    model.createAt = entity.createdAt;
    model.updateAt = entity.updatedAt;

    return model;
  }

  static toModels(entities: DepartmentEntity[] | null): DepartmentModel[] {
    if (!entities) {
      return [];
    }

    return entities.map((entity) => {
      const model = new DepartmentModel();

      model.departmentId = entity.id;
      model.name = entity.name;
      model.key = entity.key;
      model.description = entity.description;
      model.createAt = entity.createdAt;
      model.updateAt = entity.updatedAt;

      return model;
    });
  }
}
