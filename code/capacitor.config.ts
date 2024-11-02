import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'test.smart-box',
  appName: 'SmartBox',
  webDir: 'dist/smart-box/browser',
  server: {
    hostname: 'smart-box.test',
  },
};

export default config;
