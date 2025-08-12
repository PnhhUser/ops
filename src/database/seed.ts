import { AppDataSource } from './data-source';
import { seedDefaultAccount } from './seeds/account.seed';
import { seedPermission } from './seeds/permission.seed';
import { seedRolePermissionMapping } from './seeds/role-permission.seed';
import { seedRoles } from './seeds/role.seed';

// ⚠️ Ngăn không cho seed nếu đang ở production mà thiếu SEED=true
if (process.env.NODE_ENV === 'production' && process.env.SEED !== 'true') {
  console.warn('⚠️ Đang ở production, seed bị dừng vì thiếu SEED=true');
  process.exit(0);
}

AppDataSource.initialize()
  .then(async (dataSource) => {
    console.log('⚙️  Seeding default data...');

    await seedPermission(dataSource);

    await seedRoles(dataSource);

    await seedDefaultAccount(dataSource);

    await seedRolePermissionMapping(dataSource);

    console.log('🌱 Done.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
