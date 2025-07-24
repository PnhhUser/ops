import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { responseSerialize } from 'src/common/serializers/response.serializer';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { CreateAccountDTO } from './dto/create-account.dto';
import { UpdateAccountDTO } from './dto/update-account.dto';
import { IAccountService } from './interface/IAccountService';
import { AccountDTO } from './dto/account.dto';

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

    const model = AccountDTO.toModels(accounts);

    return responseSerialize(model, 'Successfully fetched account list');
  }

  // Get account
  @Get(':id')
  async account(@Param('id') id: number) {
    const account = await this.accountService.getAccount(id);

    const model = AccountDTO.toModel(account);

    return responseSerialize(
      model,
      'Successfully fetched account ' + model.accountId,
    );
  }

  // Create account
  @Post()
  async createAccount(@Body() newAccount: CreateAccountDTO) {
    await this.accountService.addAccount(newAccount);

    return responseSerialize({}, 'New account created successfully');
  }

  // Update account
  @Put()
  async UpdateAccount(@Body() account: UpdateAccountDTO) {
    await this.accountService.updateAccount(account);

    return responseSerialize({}, 'Account update successful');
  }

  // Remove account
  @Delete(':id')
  async RemoveAccount(@Param('id') id: number) {
    await this.accountService.removeAccount(id);

    return responseSerialize({}, 'Account remove successful');
  }
}
