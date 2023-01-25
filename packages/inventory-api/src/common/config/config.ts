import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 5000,
    prefix: 'api',
  },
  cors: {
    enabled: true,
    origin: ['http://localhost:3000', 'https://openfarms.brittonhayes.com', 'http://localhost:5173'],
    credentials: true,
  },
  swagger: {
    enabled: true,
    title: 'Open Farms Agriculture Inventory API',
    description: 'Open Farms Agriculture Inventory API',
    version: '1.5',
    path: 'docs',
    servers: {
      prod: 'https://openfarms.brittonhayes.com/api',
      dev: 'http://localhost:5000/api',
    },
  },
  graphql: {
    playgroundEnabled: true,
    introspection: true,
    debug: false,
    cache: 'bounded',
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
