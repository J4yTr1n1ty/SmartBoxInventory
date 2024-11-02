import { EnvironmentEnum } from './environment.enum';

export interface EnvironmentModel {
  environment: EnvironmentEnum;
  config: {
    apiUrl: string;
  };
}
