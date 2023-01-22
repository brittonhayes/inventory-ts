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
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
  cache?: 'bounded';
}

export interface SecurityConfig {
  helmet: HelmetOptions;
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}