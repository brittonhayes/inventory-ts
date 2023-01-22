import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 5000,
    prefix: 'api',
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Nestjs FTW',
    description: 'The nestjs API description',
    version: '1.5',
    path: 'api',
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
    helmet: {
      contentSecurityPolicy: false,
    },
  },
};

export default (): Config => config;