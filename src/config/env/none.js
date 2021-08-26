import baseConfig from './baseConfig';

const test = {
  baseUrl: baseConfig.apiBaseUrl.test,
};

export default {
  ...baseConfig,
  ...test,
};
