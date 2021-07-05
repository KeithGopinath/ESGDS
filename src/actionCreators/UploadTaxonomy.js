export const uploadTaxonomySuccess = (uploadTaxonomy) => ({
  type: 'UPLOAD_TAXONOMY_SUCCESS',
  uploadTaxonomy,
});

export const uploadTaxonomyFailure = (error) => ({
  type: 'UPLOAD_TAXONOMY_FAILURE',
  error,
});
