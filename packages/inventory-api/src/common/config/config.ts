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
      'http://localhost:3000',
      'https://openfarms.brittonhayes.com',
      'http://localhost:5173',
      'http://localhost:4173',
    ],
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
    sessionCookieKey: 'session',
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiration: process.env.JWT_EXPIRES_IN,
    },
    helmet: {
      contentSecurityPolicy: false,
    },
  },
};

export default (): Config => config;
