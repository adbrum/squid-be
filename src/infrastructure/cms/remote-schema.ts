import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { envParser } from '@lib/envParser';
import { buildClientSchema, IntrospectionQuery } from 'graphql';
import { remoteSchema } from './schema';
import { GraphQLSchemaValidationOptions } from 'graphql/type/schema';

const { CMS_URL, API_KEY } = envParser;

export async function getRemoteSchema() {
  if (!CMS_URL) {
    throw new Error('CMS_URL environment variable is not defined');
  }
  const remoteExecutor = buildHTTPExecutor({
    endpoint: CMS_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });

  return {
    schema: buildClientSchema(
      remoteSchema as IntrospectionQuery & GraphQLSchemaValidationOptions,
    ),
    executor: remoteExecutor,
  };
}
