import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { serializeResponse } from 'src/common/serializers/response.serializer';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { CreateAccountDTO } from './dto/create-account.dto';
import { UpdateAccountDTO } from './dto/update-account.dto';
import { RemoveAccountDTO } from './dto/remove-account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // Get all
  @Get()
  @UseGuards(JwtAuthGuard)
  async accounts() {
    const accounts = await this.accountService.getAccounts();

    return serializeResponse(accounts, '');
  }

  // Create account
  @Post()
  @UseGuards(JwtAuthGuard)
  async createAccount(@Body() newAccount: CreateAccountDTO) {
    await this.accountService.addAccount(newAccount);

    return serializeResponse({}, 'New account created successfully');
  }

  // Update account
  @Put()
  @UseGuards(JwtAuthGuard)
  async UpdateAccount(@Body() account: UpdateAccountDTO) {
    await this.accountService.updateAccount(account);

    return serializeResponse({}, 'Account update successful');
  }

  // Remove account
  @Delete()
  @UseGuards(JwtAuthGuard)
  async RemoveAccount(@Body() account: RemoveAccountDTO) {
    await this.accountService.removeAccount(account.accountId);

    return serializeResponse({}, 'Account remove successful');
  }
}
