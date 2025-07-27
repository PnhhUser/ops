import { DepartmentEntity } from 'src/database/entities/department.entity';

export class DepartmentDTO {
  departmentId: number;
  name: string;
  description: string | null;
  createAt: Date;
  updateAt: Date;

  static toModel(entity: DepartmentEntity | null): DepartmentDTO {
    const model = new DepartmentDTO();

    if (!entity) {
      return model;
    }

    model.departmentId = entity.id;
    model.name = entity.name;
    model.description = entity.description;
    model.createAt = entity.createdAt;
    model.updateAt = entity.updatedAt;

    return model;
  }

  static toModels(entities: DepartmentEntity[] | null): DepartmentDTO[] {
    if (!entities) {
      return [];
    }

    return entities.map((entity) => {
      const model = new DepartmentDTO();

      model.departmentId = entity.id;
      model.name = entity.name;
      model.description = entity.description;
      model.createAt = entity.createdAt;
      model.updateAt = entity.updatedAt;

      return model;
    });
  }
}
