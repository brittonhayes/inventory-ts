import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 5000,
    prefix: 'api',
  },
  cors: {
    enabled: true,
    origin: [
      'http://localhost:3000',
      'https://openfarms.brittonhayes.com',
      'http://localhost:5173',
      'http://localhost:4173',
    ],
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
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER_URL,
    helmet: {
      contentSecurityPolicy: false,
    },
  },
};

export default (): Config => config;
