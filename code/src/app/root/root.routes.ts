import { Routes } from '@angular/router';
import { RootRoutesEnum } from './root-routes.enum';
import { CreatePage } from './pages/create/create.page';
import { FindPage } from './pages/find/find.page';
import { BoxDetailPage } from './pages/box-detail/box-detail.page';
import { HomePage } from './pages/home/home.page';
import { CreateObjectRecognitionComponent } from './pages/create-object-recognition/create-object-recognition.component';

export const routes: Routes = [
  {
    path: RootRoutesEnum.Home,
    component: HomePage,
  },
  {
    path: RootRoutesEnum.Find,
    component: FindPage,
  },
  {
    path: RootRoutesEnum.Create,
    component: CreatePage,
  },
  {
    path: RootRoutesEnum.Box + '/:' + RootRoutesEnum.BoxIdParam,
    component: BoxDetailPage,
  },
  {
    path: RootRoutesEnum.CreateOR,
    component: CreateObjectRecognitionComponent,
  },
  {
    path: '**',
    redirectTo: `${RootRoutesEnum.Home}`,
  },
];
