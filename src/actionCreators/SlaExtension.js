export const SlaExtensionRequest = (sla) => ({
  type: 'SLA_EXTENSION_REQUEST',
  sla,
});

export const SlaExtensionSuccess = (slaResponse) => ({
  type: 'SLA_EXTENSION_SUCCESS',
  slaResponse,
});

export const SlaExtensionFailure = (error) => ({
  type: 'SLA_EXTENSION_FAILURE',
  error,
});
