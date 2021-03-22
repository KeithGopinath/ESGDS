import baseConfig from './baseConfig';

const production = {
  baseUrl: baseConfig.apiBaseUrl.prod,
};

export default {
  ...baseConfig,
  ...production,
};
