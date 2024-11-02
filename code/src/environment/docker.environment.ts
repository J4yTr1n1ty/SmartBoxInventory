import { EnvironmentEnum } from './environment.enum';
import { EnvironmentModel } from './environment.model';

export const environment: EnvironmentModel = {
  environment: EnvironmentEnum.Docker,
  config: {
    apiUrl: 'https://smart-box.test/api/',
  },
};
