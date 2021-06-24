export const newClientTaxonomyRequest = (payload) => ({
  type: 'NEW_CLIENT_TAXONOMY_REQUEST',
  payload,
});

export const newClientTaxonomySuccess = (newClientTaxonomy) => ({
  type: 'NEW_CLIENT_TAXONOMY_SUCCESS',
  newClientTaxonomy,
});

export const newClientTaxonomyFailure = (error) => ({
  type: 'NEW_CLIENT_TAXONOMY_FAILURE',
  error,
});
