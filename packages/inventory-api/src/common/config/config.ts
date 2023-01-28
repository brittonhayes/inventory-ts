import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 5000,
    prefix: 'api',
  },
  cors: {
    enabled: true,
    credentials: true,
    origin: [
      'https://openfarms.brittonhayes.com',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4173',
    ],
  },
  swagger: {
    enabled: process.env.NODE_ENV !== 'production',
    title: 'Open Farms Agriculture Inventory API',
    description: 'Open Farms Agriculture Inventory API',
    version: '1.5',
    docsPath: '/docs',
    servers: {
      prod: 'https://openfarms.brittonhayes.com',
      dev: 'http://localhost:5000',
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
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    jwt: {
      secret: process.env.JWT_SECRET || '',
      refreshSecret: process.env.JWT_REFRESH_SECRET || '',
    },
    helmet: {
      contentSecurityPolicy: false,
    },
  },
};

export default (): Config => config;
