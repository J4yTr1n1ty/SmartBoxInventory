import { Routes } from '@angular/router';
import { RootRoutesEnum } from './root-routes.enum';
import { CreatePage } from './pages/create/create.page';
import { FindPage } from './pages/find/find.page';
import { CreateObjectRecognitionComponent } from './pages/create-object-recognition/create-object-recognition.component';

export const routes: Routes = [
  {
    path: RootRoutesEnum.Find,
    component: FindPage,
  },
  {
    path: RootRoutesEnum.Create,
    component: CreatePage,
  },
  {
    path: RootRoutesEnum.ORDebug,
    component: CreateObjectRecognitionComponent,
  },
  {
    path: '**',
    redirectTo: `${RootRoutesEnum.Create}`,
  },
];
