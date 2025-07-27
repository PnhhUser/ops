import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  env: process.env.NODE_ENV,
  protocol:
    process.env.NODE_ENV === 'development'
      ? process.env.HTTP
      : process.env.HTTPS,
  domain: process.env.DOMAIN,
}));
