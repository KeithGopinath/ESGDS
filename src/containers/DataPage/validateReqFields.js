/* eslint-disable camelcase */
export default (errors, roleScreenType) => {
  const {
    isAnalyst_DC, isAnalyst_DCR, isAnalyst_CC, isQA_DV, isCompanyRep_DR, isClientRep_DR, isHistoryType,
  } = roleScreenType;

  const {
    formTextSnippet,
    formPageNo,
    formScreenShotPath,
    formResponse,
    formSource,
    formURL,
    formPublicDate,
    formScreenShotFile,
    formErrorType,
    formComment,
    formIsError,
    errorComment,
    formControversyComment,
    formNextReviewDate,
    dynamicFields,
    formThreshold,
  } = errors;
  if (isAnalyst_DC) {
    return (!formSource && !formResponse && !formTextSnippet && !formPageNo && !formScreenShotPath && !formThreshold &&
    !dynamicFields.includes(true));
  }
  if (isAnalyst_DCR) {
    return (!formSource && !formResponse && !formTextSnippet && !formPageNo && !formScreenShotPath && !errorComment && !formThreshold &&
      !dynamicFields.includes(true));
  }
  if (isAnalyst_CC) {
    return (!formSource && !formResponse && !formTextSnippet && !formPageNo && !formURL && !formPublicDate && !formScreenShotPath &&
    !formNextReviewDate && !formControversyComment && !dynamicFields.includes(true));
  }
  if (isQA_DV) {
    return (!formSource && !formResponse && !formTextSnippet && !formPageNo && !formThreshold &&
    !formScreenShotPath && !dynamicFields.includes(true) && !formIsError && !formErrorType && !formComment);
  }
  if (isCompanyRep_DR) {
    return (!formSource && !formResponse && !formTextSnippet && !formPageNo && !formScreenShotPath && !formComment && !formThreshold &&
    !dynamicFields.includes(true));
  }
  if (isCompanyRep_DR) {
    return (!formSource && !formResponse && !formTextSnippet && !formPageNo && !formScreenShotPath && !formComment && !formThreshold &&
      !dynamicFields.includes(true));
  }
  if (isClientRep_DR) {
    return (!formSource && !formResponse && !formTextSnippet && !formPageNo && !formScreenShotPath && !formComment && !formThreshold &&
      !dynamicFields.includes(true));
  }
  if (isHistoryType) {
    return (!formSource && !formResponse && !formTextSnippet && !formPageNo && !formScreenShotPath && !formThreshold &&
      !formScreenShotFile && !dynamicFields.includes(true));
  }
  return false;
};
