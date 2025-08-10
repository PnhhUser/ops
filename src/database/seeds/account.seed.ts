import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AccountEntity } from '../entities/account.entity';
import { RoleEntity } from '../entities/role.entity';
import { UserRole } from '../../common/constants/enums/role.enum';

export async function seedDefaultAccount(dataSource: DataSource) {
  const accountRepo = dataSource.getRepository(AccountEntity);
  const roleRepo = dataSource.getRepository(RoleEntity);

  const adminExists = await accountRepo.findOneBy({ username: 'admin' });
  if (adminExists) {
    console.log('🔁 Admin account already exists.');
    return;
  }

  const adminRole = await roleRepo.findOneBy({ key: UserRole.ADMIN });
  if (!adminRole) {
    throw new Error('❌ Cannot create admin account: admin role not found.');
  }

  const admin = new AccountEntity();
  admin.username = 'admin';
  admin.password = await bcrypt.hash('123456', 10);
  admin.role = adminRole;

  await accountRepo.save(admin);
  console.log('✅ Admin account seeded.');
}
