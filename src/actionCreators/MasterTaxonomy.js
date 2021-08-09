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

export const getMasterTaxonomyHeaderRequest = () => ({
  type: 'MASTER_TAXONOMY_HEADER_REQUEST',
});

export const getMasterTaxonomyHeaderSuccess = (column) => ({
  type: 'MASTER_TAXONOMY_HEADER_SUCCESS',
  column,
});

export const getMasterTaxonomyHeaderFailure = (error) => ({
  type: 'MASTER_TAXONOMY_HEADER_FAILURE',
  error,
});
