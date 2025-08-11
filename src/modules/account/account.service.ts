import { Inject, Injectable } from '@nestjs/common';
import { ExceptionSerializer } from 'src/common/serializers/exception.serializers';
import { CreateAccountDTO } from './dto/create-account.dto';
import { UpdateAccountDTO } from './dto/update-account.dto';
import { ErrorMessages } from 'src/common/constants/error-message.constant';
import { IAccountService } from './interface/IAccountService';
import { IAccountRepository } from 'src/database/repositories/interfaces/IAccountRepository';
import { AccountEntity } from 'src/database/entities/account.entity';
import { IRoleRepository } from 'src/database/repositories/interfaces/IRoleRepository';
import { RoleEntity } from 'src/database/entities/role.entity';
import { IJwtPayload } from '../auth/interface/IJwtPayload';

@Injectable()
export class AccountService implements IAccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository<AccountEntity>,
    @Inject('IRoleRepository')
    private readonly roleRepository: IRoleRepository<RoleEntity>,
  ) {}

  async getAccounts() {
    return await this.accountRepository.getAll();
  }

  async getAccount(accountId: number): Promise<AccountEntity | null> {
    if (typeof accountId !== 'number' || isNaN(accountId) || accountId <= 0) {
      throw ExceptionSerializer.badRequest('Invalid account bababa ID');
    }
    return await this.accountRepository.getById(accountId);
  }

  async addAccount(dto: CreateAccountDTO) {
    const username = await this.accountRepository.getByUsername(dto.username);

    if (username) {
      throw ExceptionSerializer.conflict(
        ErrorMessages.account.ACCOUNT_USERNAME_EXISTS,
      );
    }

    const role = await this.roleRepository.getById(dto.roleId);

    if (!role) {
      throw ExceptionSerializer.badRequest('This role does not exist');
    }

    const create = await CreateAccountDTO.toEntity(dto);

    await this.accountRepository.add(create);

    return await this.accountRepository.getById(create.id);
  }

  async updateAccount(dto: UpdateAccountDTO, currentUser: IJwtPayload) {
    const existedAccount = await this.accountRepository.getById(dto.accountId);

    if (!existedAccount) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.account.ACCOUNT_NOT_FOUND,
      );
    }

    // Nếu đây là admin duy nhất → không cho đổi role
    if (existedAccount.role.key === 'admin') {
      const totalAdmins = await this.accountRepository.countByRoleKey('admin');
      if (totalAdmins === 1 && dto.roleId !== existedAccount.roleId) {
        throw ExceptionSerializer.forbidden(
          'You cannot change the role of the only remaining admin.',
        );
      }
    }

    // Lấy role của người đang đăng nhập
    const current = await this.accountRepository.getById(currentUser.sub);

    if (!current) {
      throw ExceptionSerializer.unauthorized('Current user not found.');
    }

    // Nếu user đang sửa chính mình → không được đổi role
    if (
      current.id === existedAccount.id &&
      current.role.key !== 'admin' &&
      dto.roleId !== existedAccount.roleId
    ) {
      throw ExceptionSerializer.forbidden(
        'You are not allowed to change your own role.',
      );
    }

    // Nếu user thường muốn sửa admin → cấm
    const targetRole = await this.roleRepository.getById(existedAccount.roleId);
    if (current.role.key === 'user' && targetRole?.key === 'admin') {
      throw ExceptionSerializer.forbidden(
        'You are not allowed to modify an admin account.',
      );
    }

    const duplicatedUsername = await this.accountRepository.getByUsername(
      dto.username,
    );
    if (duplicatedUsername && duplicatedUsername.id !== dto.accountId) {
      throw ExceptionSerializer.conflict(
        ErrorMessages.account.ACCOUNT_USERNAME_EXISTS,
      );
    }

    const role = await this.roleRepository.getById(dto.roleId);
    if (!role) {
      throw ExceptionSerializer.badRequest('This role does not exist');
    }

    const update = await UpdateAccountDTO.toEntity(dto);
    if (!dto.password || dto.password.trim() === '') {
      update.password = existedAccount.password;
    }

    await this.accountRepository.update(update);
    return await this.accountRepository.getById(update.id);
  }

  async removeAccount(accountId: number, currentUser: IJwtPayload) {
    if (typeof accountId !== 'number') {
      throw ExceptionSerializer.badRequest(
        ErrorMessages.account.ACCOUNT_ID_NOT_INTEGER,
      );
    }

    if (accountId <= 0) {
      throw ExceptionSerializer.badRequest(
        ErrorMessages.account.ACCOUNT_ID_TOO_SMALL,
      );
    }

    const existedAccount = await this.accountRepository.getById(accountId);

    if (!existedAccount) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.account.ACCOUNT_NOT_FOUND,
      );
    }

    // Lấy role gửi lên
    const targetRole = await this.roleRepository.getById(existedAccount.roleId);

    // Lấy role của người đang đăng nhập
    const current = await this.accountRepository.getById(currentUser.sub);

    if (current && current.role.key === 'user' && targetRole?.key === 'admin') {
      throw ExceptionSerializer.forbidden(
        'You are not allowed to delete an admin account.',
      );
    }

    if (current?.role.key === 'admin' && current.id === existedAccount.id) {
      throw ExceptionSerializer.forbidden(
        'You cannot delete your own account as an admin.',
      );
    }

    await this.accountRepository.delete(existedAccount.id);
  }

  async setOffline(accountId: number): Promise<void> {
    const account = await this.accountRepository.getById(accountId);
    if (account) {
      account.lastSeen = null;
      await this.accountRepository.update(account);
    }
  }

  async getRolesForSelect(currentUser: IJwtPayload): Promise<RoleEntity[]> {
    const account = await this.accountRepository.getById(currentUser.sub);

    // Nếu admin → lấy tất cả role
    if (account && account.role.key === 'admin') {
      return await this.roleRepository.getAll();
    }

    // Nếu user → lọc bỏ role admin
    return await this.roleRepository.getAllExcept('admin');
  }
}
