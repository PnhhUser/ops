import 'dotenv/config';
import { DataSource } from 'typeorm';
import { AccountEntity } from '../entities/account.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../common/constants/enums/role.enum';

export const seedDefaultAccount = async (dataSource: DataSource) => {
  const accountRepo = dataSource.getRepository(AccountEntity);

  const existing = await accountRepo.findOneBy({ username: 'admin' });

  const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD;

  if (!defaultPassword) {
    throw new Error('Missing DEFAULT_ADMIN_PASSWORD in env file');
  }

  if (!existing) {
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const admin = accountRepo.create({
      username: 'admin',
      password: hashedPassword,
      isActive: true,
      role: UserRole.ADMIN,
      lastSeen: null,
    });

    await accountRepo.save(admin);

    console.log('✅ Admin account created.');
  } else {
    console.log('ℹ️ Admin account already exists.');
  }
};
