import { Routes } from '@angular/router';
import { RootRoutesEnum } from './root-routes.enum';
import { CreatePage } from './pages/create/create.page';
import { FindPage } from './pages/find/find.page';
import { ValiTestPage } from './pages/vali-test/vali-test.page';
import { CupTestPage } from './pages/cup-test/cup-test.page';
import { CalTestPage } from './pages/cal-test/cal-test.page';
import { BoxDetiailPage } from './pages/box-detiail/box-detiail.page';

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
  path: RootRoutesEnum.Box + "/:" + RootRoutesEnum.BoxIdParam,
  component: BoxDetiailPage,
  },
  {
    path: '**',
    redirectTo: `${RootRoutesEnum.Create}`,
  },
];
