export const getMasterTaxonomyRequest = () => ({
  type: 'MASTER_TAXONOMY_REQUEST',
});

export const getMasterTaxonomySuccess = (masterTaxonomy) => ({
  type: 'MASTER_TAXONOMY_SUCCESS',
  masterTaxonomy,
});

export const getMasterTaxonomyFailure = (error) => ({
  type: 'MASTER_TAXONOMY_FAILURE',
  error,
});
