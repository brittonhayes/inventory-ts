import { CorsConfig, GraphqlConfig } from '@app/common/config/config.interface';
import { ConfigService } from '@nestjs/config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService) {}
  createGqlOptions(): ApolloDriverConfig {
    const graphqlConfig = this.configService.get<GraphqlConfig>('graphql');
    const corsConfig = this.configService.get<CorsConfig>('cors');
    return {
      // schema options
      autoSchemaFile: graphqlConfig.schemaDestination || './schema.graphql',
      sortSchema: graphqlConfig.sortSchema,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      cors: {
        origin: corsConfig.origin,
        credentials: corsConfig.credentials,
      },
      introspection: graphqlConfig.introspection,
      cache: graphqlConfig.cache,
      debug: graphqlConfig.debug,
      playground: graphqlConfig.playgroundEnabled,
      context: ({ req }) => ({ req }),
    };
  }
}
