import { Gender } from 'src/common/constants/enums/employee.enum';
import { EmployeeEntity } from 'src/database/entities/employee.entity';

export class EmployeeModel {
  employeeId: number;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  gender: Gender;
  dateOfBirth: Date | null;
  startDate: Date | null;
  isActive: boolean;
  positionName: string;
  accountName: string;
  departmentName: string;
  createAt: Date;
  updateAt: Date;

  static toModel(entity: EmployeeEntity | null): EmployeeModel {
    const model = new EmployeeModel();

    if (!entity) {
      return model;
    }

    model.employeeId = entity.id;
    model.fullName = entity.fullName;
    model.email = entity.email;
    model.address = entity.address;
    model.phoneNumber = entity.phoneNumber;
    model.gender = entity.gender;
    model.dateOfBirth = entity.dateOfBirth;
    model.startDate = entity.startDate;
    model.isActive = entity.isActive;

    model.positionName = entity.position?.name ?? '';
    model.accountName = entity.account?.username ?? '';
    model.departmentName = entity.position?.department?.name ?? '';

    model.createAt = entity.createdAt;
    model.updateAt = entity.updatedAt;

    return model;
  }

  static toModels(entities: EmployeeEntity[] | null): EmployeeModel[] {
    if (!entities) {
      return [];
    }

    return entities.map((entity) => {
      const model = new EmployeeModel();

      model.employeeId = entity.id;
      model.fullName = entity.fullName;
      model.email = entity.email;
      model.address = entity.address;
      model.phoneNumber = entity.phoneNumber;
      model.gender = entity.gender;
      model.dateOfBirth = entity.dateOfBirth;
      model.startDate = entity.startDate;
      model.isActive = entity.isActive;

      model.positionName = entity.position?.name ?? '';
      model.accountName = entity.account?.username ?? '';
      model.departmentName = entity.position?.department?.name ?? '';

      model.createAt = entity.createdAt;
      model.updateAt = entity.updatedAt;

      return model;
    });
  }
}
