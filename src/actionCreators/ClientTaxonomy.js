export const getClientTaxonomyRequest = () => ({
  type: 'ClientTaxonomy_REQUEST',
});
export const getClientTaxonomySuccess = (ClientTaxonomy) => ({
  type: 'ClientTaxonomy_SUCCESS',
  ClientTaxonomy,
});
export const getClientTaxonomyFailure = (error) => ({
  type: 'ClientTaxonomy_FAILURE',
  error,
});
