import baseConfig from './baseConfig';

const qa = {
  baseUrl: baseConfig.apiBaseUrl.test,
};

export default {
  ...baseConfig,
  ...qa,
};
