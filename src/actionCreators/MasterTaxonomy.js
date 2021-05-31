export const getMasterTaxonomyRequest = () => ({
  type: 'MASTER_TAXONOMY_REQUEST',
});

export function getMasterTaxonomySuccess(masterTaxonomy) {
  return {
    type: 'MASTER_TAXONOMY_SUCCESS',
    masterTaxonomy,
  };
}

export function getMasterTaxonomyFailure(error) {
  return {
    type: 'MASTER_TAXONOMY_FAILURE',
    error,
  };
}
