import { Routes } from '@angular/router';
import { RootRoutesEnum } from './root-routes.enum';
import { CreatePage } from './pages/create/create.page';
import { FindPage } from './pages/find/find.page';
import { ValiTestPage } from './pages/vali-test/vali-test.page';
import { CupTestPage } from './pages/cup-test/cup-test.page';
import { CalTestPage } from './pages/cal-test/cal-test.page';
import { BoxDetailPage } from './pages/box-detail/box-detail.page';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  {
    path: RootRoutesEnum.CalTest,
    component: CalTestPage,
  },
  {
    path: RootRoutesEnum.CupTest,
    component: CupTestPage,
  },
  {
    path: RootRoutesEnum.Home,
    component: HomePage,
  },
  {
    path: RootRoutesEnum.ValiTest,
    component: ValiTestPage,
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
    path: '**',
    redirectTo: `${RootRoutesEnum.Home}`,
  },
];
