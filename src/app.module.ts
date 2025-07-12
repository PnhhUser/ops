import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from './config/app.config';
import jwtConfig from './config/jwt.config';
import mysqlConfig from './config/mysql.config';
import { mysqlProvider } from './providers/mysql.provider';
import { AuthModule } from './modules/auth/auth.module';
import { PositionModule } from './modules/position/position.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, mysqlConfig],
      envFilePath: 'environments/.env.production',
    }),
    TypeOrmModule.forRootAsync(mysqlProvider),
    AuthModule,
    PositionModule,
  ],
  providers: [],
})
export class AppModule {}
