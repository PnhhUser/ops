import { AppDataSource } from './data-source';
import { seedDefaultAccount } from './seeds/account.seed';

AppDataSource.initialize()
  .then(async (dataSource) => {
    console.log('⚙️  Seeding default data...');
    await seedDefaultAccount(dataSource);
    console.log('🌱 Done.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  });
