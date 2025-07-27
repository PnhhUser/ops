import { Inject, Injectable } from '@nestjs/common';

import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { ExceptionSerializer } from '../../common/serializers/exception.serializers';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import { ErrorMessages } from '../../common/constants/error-message.constant';
import { IEmployeeService } from './interface/IEmployeeService';
import { AccountEntity } from 'src/database/entities/account.entity';
import { IAccountRepository } from 'src/database/repositories/interfaces/IAccountRepository';
import { IEmployeeRepository } from 'src/database/repositories/interfaces/IEmployeeRepository';
import { EmployeeEntity } from 'src/database/entities/employee.entity';
import { IPositionRepository } from 'src/database/repositories/interfaces/IPositionRepository';
import { PositionEntity } from 'src/database/entities/position.entity';

@Injectable()
export class EmployeeService implements IEmployeeService {
  constructor(
    @Inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository<EmployeeEntity>,
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository<AccountEntity>,
    @Inject('IPositionRepository')
    private readonly positionRepository: IPositionRepository<PositionEntity>,
  ) {}

  async getEmployees() {
    return this.employeeRepository.getAllWithRelations();
  }

  async addEmployee(newEmp: CreateEmployeeDTO) {
    const emailExisted = await this.employeeRepository.getByEmail(newEmp.email);

    // check mail trùng lặp
    if (emailExisted) {
      throw ExceptionSerializer.conflict(ErrorMessages.employee.EMAIL_EXISTS);
    }

    if (newEmp.accountId) {
      const accountExisted = await this.accountRepository.getById(
        newEmp.accountId,
      );

      if (!accountExisted) {
        throw ExceptionSerializer.notFound(
          ErrorMessages.account.ACCOUNT_NOT_FOUND,
        );
      }

      const isTaken = await this.isAccountTaken(newEmp.accountId);

      if (isTaken) {
        throw ExceptionSerializer.badRequest(
          ErrorMessages.account.ACOUNT_ALREADY_USE,
        );
      }
    }

    // check positionId đầu vào
    if (!newEmp.positionId) {
      throw ExceptionSerializer.badRequest(
        ErrorMessages.position.POSITION_NOT_FOUND,
      );
    }

    const positionExisted = await this.positionRepository.getById(
      newEmp.positionId,
    );

    // kiểm tra position có hay không
    if (!positionExisted) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.position.POSITION_NOT_FOUND,
      );
    }

    const created = CreateEmployeeDTO.toEntity(newEmp);

    await this.employeeRepository.add(created);

    return created;
  }

  async updateEmployee(emp: UpdateEmployeeDTO) {
    const existed = await this.employeeRepository.getById(emp.employeeId);

    if (!existed) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.employee.EMPLOYEE_NOT_FOUND,
      );
    }

    const duplicatedEmail = await this.employeeRepository.getByEmail(emp.email);

    if (duplicatedEmail && duplicatedEmail.id !== emp.employeeId) {
      throw ExceptionSerializer.conflict(
        ErrorMessages.employee.EMPLOYEE_EXISTS,
      );
    }

    if (emp.accountId) {
      const accountExisted = await this.accountRepository.getById(
        emp.accountId,
      );

      if (!accountExisted) {
        throw ExceptionSerializer.notFound(
          ErrorMessages.account.ACCOUNT_NOT_FOUND,
        );
      }

      const isTaken = await this.isAccountTaken(emp.accountId, existed.id);

      if (isTaken) {
        throw ExceptionSerializer.badRequest(
          ErrorMessages.account.ACOUNT_ALREADY_USE,
        );
      }
    }

    if (!emp.positionId) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.position.POSITION_NOT_FOUND,
      );
    }

    const positionExisted = await this.positionRepository.getById(
      emp.positionId,
    );

    if (!positionExisted) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.position.POSITION_NOT_FOUND,
      );
    }

    const updated = UpdateEmployeeDTO.toEntity(emp);

    await this.employeeRepository.update(updated);

    return updated;
  }

  async removeEmployee(empId: number) {
    if (typeof empId !== 'number') {
      throw ExceptionSerializer.badRequest(
        ErrorMessages.employee.ID_NOT_INTEGER,
      );
    }

    if (empId <= 0) {
      throw ExceptionSerializer.badRequest(ErrorMessages.employee.ID_TOO_SMALL);
    }

    const existed = await this.employeeRepository.getById(empId);

    if (!existed) {
      throw ExceptionSerializer.notFound(
        ErrorMessages.employee.EMPLOYEE_NOT_FOUND,
      );
    }

    await this.employeeRepository.delete(existed.id);
  }

  private async isAccountTaken(accountId: number, ignoreEmployeeId?: number) {
    const employees =
      await this.employeeRepository.getEmployeesByAccountId(accountId);

    if (employees.length === 0) {
      return false;
    }

    if (ignoreEmployeeId) {
      return employees.some((e) => e.id !== ignoreEmployeeId);
    }

    return true;
  }
}
