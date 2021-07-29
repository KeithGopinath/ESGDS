/* eslint-disable camelcase */
export default (dataToValidate, roleScreenType) => {
  const [isAnalyst_DC, isAnalyst_DCR, isAnalyst_CC, isQA_DV, isCompanyRep_DR, isClientRep_DR, isHistoryType] = roleScreenType;
  if (isAnalyst_DC) {
    if (
      dataToValidate.source && (dataToValidate.source.url && dataToValidate.source.sourceName && dataToValidate.source.publicationDate) && dataToValidate.response && dataToValidate.screenShot && dataToValidate.pageNo &&
      dataToValidate.textSnippet
    ) {
      return true;
    }
  }
  if (isAnalyst_DCR) {
    // NONE
  }
  if (isAnalyst_CC) {
    if (
      dataToValidate.source && (dataToValidate.source.url && dataToValidate.source.sourceName && dataToValidate.source.publicationDate) && dataToValidate.response && dataToValidate.screenShot && dataToValidate.pageNo &&
        dataToValidate.textSnippet && dataToValidate.comment
    ) {
      return true;
    }
  }
  if (isQA_DV) {
    // NONE
  }
  if (isCompanyRep_DR) {
    // NONE
  }
  if (isCompanyRep_DR) {
    // NONE
  }
  if (isClientRep_DR) {
    // NONE
  }
  if (isHistoryType) {
    // NONE
  }
  return false;
};
