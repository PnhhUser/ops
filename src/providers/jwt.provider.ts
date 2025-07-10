import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';

export const jwtProvider: JwtModuleAsyncOptions = {
  imports: [ConfigModule.forFeature(jwtConfig)],
  inject: [jwtConfig.KEY],
  useFactory: (jwtcfg: ConfigType<typeof jwtConfig>) => ({
    secret: jwtcfg.secret,
    signOptions: {
      expiresIn: jwtcfg.expiresIn,
    },
  }),
};
