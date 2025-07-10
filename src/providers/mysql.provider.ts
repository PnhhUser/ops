import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import mysqlConfig from 'src/config/mysql.config';

export const mysqlProvider: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule.forFeature(mysqlConfig)],
  inject: [mysqlConfig.KEY],
  useFactory: (config: ConfigType<typeof mysqlConfig>) => ({
    type: 'mysql',
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    synchronize: false,
    autoLoadEntities: true,
  }),
};
