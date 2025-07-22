import { AccountEntity } from 'src/database/entities/account.entity';

export class AccountDTO {
  accountId: number;
  username: string;
  roleId: number;
  isAction: boolean;
  lastseen: Date | null;
  createdAt: Date;
  updatedAt: Date;

  static toModel(entities: AccountEntity[] | null): AccountDTO[] {
    if (!entities) return [];

    return entities.map((entity) => {
      const model = new AccountDTO();
      model.accountId = entity.id;
      model.username = entity.username;
      model.roleId = entity.roleId;
      model.isAction = entity.isActive;
      model.lastseen = entity.lastSeen;
      model.createdAt = entity.createdAt;
      model.updatedAt = entity.updatedAt;
      return model;
    });
  }
}
