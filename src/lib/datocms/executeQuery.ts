import { executeQuery as libExecuteQuery } from '@datocms/cda-client';
import { DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN } from 'astro:env/server';
import type { TadaDocumentNode } from 'gql.tada';

/**
 * Executes a GraphQL query using the DatoCMS Content Delivery API.
 */
export async function executeQuery<Result, Variables>(
  query: TadaDocumentNode<Result, Variables>,
  options?: ExecuteQueryOptions<Variables>,
) {
  const result = await libExecuteQuery(query, {
    variables: options?.variables,
    excludeInvalid: true,
    token: DATOCMS_PUBLISHED_CONTENT_CDA_TOKEN,
  });

  return result;
}

type ExecuteQueryOptions<Variables> = {
  variables?: Variables;
};
