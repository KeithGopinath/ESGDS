export const subsetTaxonomyDownloadGetRequest = () => ({
  type: 'SUBSET_TAXONOMY_DOWNLOAD_GET_REQUEST',
});

export const subsetTaxonomyDownloadGetSuccess = (subsetTaxonomyData) => ({
  type: 'SUBSET_TAXONOMY_DOWNLOAD_GET_SUCCESS',
  subsetTaxonomyData,
});

export const subsetTaxonomyDownloadGetFailure = (error) => ({
  type: 'SUBSET_TAXONOMY_DOWNLOAD_GET_FAILURE',
  error,
});
