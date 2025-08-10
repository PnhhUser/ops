import { AccountEntity } from 'src/database/entities/account.entity';
import { RoleEntity } from 'src/database/entities/role.entity';

export class AccountModel {
  accountId: number;
  username: string;
  roleId: number;
  isActive: boolean;
  lastseen: Date | null;
  role: RoleEntity | null;
  createdAt: Date;
  updatedAt: Date;

  static toModel(entity: AccountEntity | null): AccountModel {
    const model = new AccountModel();

    if (!entity) {
      return model;
    }

    model.accountId = entity.id;
    model.username = entity.username;
    model.roleId = entity.roleId;
    model.role = entity.role;
    model.isActive = entity.isActive;
    model.lastseen = entity.lastSeen;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;
    return model;
  }

  static toModels(entities: AccountEntity[] | null): AccountModel[] {
    if (!entities) return [];

    return entities.map((entity) => {
      const model = new AccountModel();
      model.accountId = entity.id;
      model.username = entity.username;
      model.roleId = entity.roleId;
      model.role = entity.role;
      model.isActive = entity.isActive;
      model.lastseen = entity.lastSeen;
      model.createdAt = entity.createdAt;
      model.updatedAt = entity.updatedAt;
      return model;
    });
  }
}
