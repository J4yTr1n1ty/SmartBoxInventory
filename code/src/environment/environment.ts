import { EnvironmentEnum } from './environment.enum';
import { EnvironmentModel } from './environment.model';

export const environment: EnvironmentModel = {
  environment: EnvironmentEnum.Production,
  config: {
    apiUrl: '{BACKEND_URL}/',
  },
};
