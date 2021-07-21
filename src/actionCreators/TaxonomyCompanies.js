export const getTaxonomycompanyRequest = (taxid) => ({
  type: 'TAXANOMYCOMPANY_REQUEST',
  taxid,
});

export const getTaxonomycompanySuccess = (taxcompany) => ({
  type: 'TAXANOMYCOMPANY_SUCCESS',
  taxcompany,
});

export const getTaxonomycompanyFailure = (error) => ({
  type: 'TAXANOMYCOMPANY_FAILURE',
  error,
});
