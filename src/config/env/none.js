import baseConfig from './baseConfig';

const qa = {
  baseUrl: baseConfig.apiBaseUrl.qa,
};

export default {
  ...baseConfig,
  ...qa,
};
