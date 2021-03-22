import baseConfig from './baseConfig';

const development = {
  baseUrl: baseConfig.apiBaseUrl.dev,
};

export default {
  ...baseConfig,
  ...development,
};
