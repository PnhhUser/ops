import { AppDataSource } from './data-source';
import { seedDefaultAccount } from './seeds/account.seed';
import { seedRoles } from './seeds/role.seed';

AppDataSource.initialize()
  .then(async (dataSource) => {
    console.log('⚙️  Seeding default data...');

    // Step 1: Seed Roles (must come first)
    await seedRoles(dataSource);

    // Step 2: Seed Admin Account
    await seedDefaultAccount(dataSource);

    console.log('🌱 Done.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
