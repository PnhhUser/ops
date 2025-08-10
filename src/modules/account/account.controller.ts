import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { responseSerialize } from 'src/common/serializers/response.serializer';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { CreateAccountDTO } from './dto/create-account.dto';
import { UpdateAccountDTO } from './dto/update-account.dto';
import { IAccountService } from './interface/IAccountService';
import { AccountModel } from './account.model';
import { Request } from 'express';
import { IJwtPayload } from '../auth/interface/IJwtPayload';
import { RoleModel } from '../role/role.model';
// import { RoleModel } from '../role/role.model';

@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountController {
  constructor(
    @Inject('IAccountService') private readonly accountService: IAccountService,
  ) {}

  // Get all
  @Get()
  async accounts() {
    const accounts = await this.accountService.getAccounts();

    const model = AccountModel.toModels(accounts);

    return responseSerialize(model, 'Successfully fetched account list');
  }

  @Get('for-selection')
  async getRolesForSelect(@Req() req: Request) {
    const currentUser = req.user as IJwtPayload;

    const roles = await this.accountService.getRolesForSelect(currentUser);

    const models = RoleModel.toModels(roles);

    return responseSerialize(models, 'Successfully fetched role list');
  }

  // Get account
  @Get(':id')
  async account(@Param('id') id: number) {
    const account = await this.accountService.getAccount(id);

    const model = AccountModel.toModel(account);

    return responseSerialize(model, 'Successfully fetched account ');
  }

  // Create account
  @Post()
  async createAccount(@Body() newAccount: CreateAccountDTO) {
    const created = await this.accountService.addAccount(newAccount);

    const model = AccountModel.toModel(created);

    return responseSerialize(model, 'New account created successfully');
  }

  // Update account
  @Put()
  async UpdateAccount(@Body() account: UpdateAccountDTO, @Req() req: Request) {
    const currentUser = req.user as IJwtPayload;

    const updated = await this.accountService.updateAccount(
      account,
      currentUser,
    );

    const model = AccountModel.toModel(updated);

    return responseSerialize(model, 'Account update successful');
  }

  // Remove account
  @Delete(':id')
  async RemoveAccount(@Param('id') id: number, @Req() req: Request) {
    const currentUser = req.user as IJwtPayload;

    await this.accountService.removeAccount(id, currentUser);

    return responseSerialize({}, 'Account remove successful');
  }
}
