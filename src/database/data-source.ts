import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';

const AppDataSource: DataSource = new DataSource({
  type: 'mysql',
});

AppDataSource.initialize()
  .then(() => {
    Logger.log('Data Source has been initialized!');
  })
  .catch((error) => {
    Logger.error(
      'Error during Data Source initialization in data-source.ts',
      error,
    );
  });
