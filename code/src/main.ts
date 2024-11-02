import { bootstrapApplication } from '@angular/platform-browser';
import { RootPage } from './app/root/root.page';
import { rootConfig } from './app/root/root.config';

bootstrapApplication(RootPage, rootConfig).catch((err) => console.error(err));
