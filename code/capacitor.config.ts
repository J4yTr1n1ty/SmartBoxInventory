import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'test.easy-move',
  appName: 'Easy Move',
  webDir: 'dist/easy-move/browser',
  server: {
    hostname: 'easy-move.test',
  },
};

export default config;
