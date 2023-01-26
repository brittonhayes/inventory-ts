import { HelmetOptions } from 'helmet';

export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  graphql: GraphqlConfig;
  security: SecurityConfig;
}

export interface NestConfig {
  port: number;
  prefix: string;
}

export interface CorsConfig {
  enabled: boolean;
  credentials?: boolean;
  origin?: string[] | RegExp;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  servers: {
    prod: string;
    dev: string;
  };
  version: string;
  path: string;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
  cache?: 'bounded';
  introspection: boolean;
}

export interface SecurityConfig {
  helmet: HelmetOptions;
  jwt: JwtConfig;
  google: GoogleOauthConfig;
  sessionCookieKey: string;
}

export interface GoogleOauthConfig {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
}

export interface JwtConfig {
  secret: string;
  expiration: string;
}
