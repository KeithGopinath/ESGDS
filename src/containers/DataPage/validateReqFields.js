/* eslint-disable camelcase */
export default (dataToValidate, roleScreenType) => {
  const [isAnalyst_DC, isAnalyst_DCR, isAnalyst_CC, isQA_DV, isCompanyRep_DR, isClientRep_DR, isHistoryType] = roleScreenType;
  if (isAnalyst_DC) {
    // if (
    //   dataToValidate.source && (dataToValidate.source.url && dataToValidate.source.sourceName && dataToValidate.source.publicationDate) && dataToValidate.response && dataToValidate.screenShot && dataToValidate.pageNo &&
    //   dataToValidate.textSnippet
    // ) {
    //   return true;
    // }
    return true;
  }
  if (isAnalyst_DCR) {
    return true;
  }
  if (isAnalyst_CC) {
    if (
      dataToValidate.source && (dataToValidate.source.url && dataToValidate.source.sourceName && dataToValidate.source.publicationDate) && dataToValidate.response && dataToValidate.screenShot && dataToValidate.pageNo &&
        dataToValidate.textSnippet && dataToValidate.comment && dataToValidate.nextReviewDate
    ) {
      return true;
    }
  }
  if (isQA_DV) {
    return true;
  }
  if (isCompanyRep_DR) {
    return true;
  }
  if (isCompanyRep_DR) {
    return true;
  }
  if (isClientRep_DR) {
    return true;
  }
  if (isHistoryType) {
    return true;
  }
  return false;
};
