import { AppDataSource } from './data-source';
import { seedDefaultAccount } from './seeds/account.seed';
import { seedPermission } from './seeds/permission.seed';
import { seedRoles } from './seeds/role.seed';

AppDataSource.initialize()
  .then(async (dataSource) => {
    console.log('⚙️  Seeding default data...');

    await seedPermission(dataSource);

    await seedRoles(dataSource);

    await seedDefaultAccount(dataSource);

    console.log('🌱 Done.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
