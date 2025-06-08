import { Routes } from "@angular/router";
import { StoreLayoutComponent } from "./layouts/store-layout/store-layout.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ObjectPageComponent } from "./pages/object-page/object-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { GroupPageComponent } from "./pages/group-page/group-page.component";


export const storeRoutes: Routes = [
  {
    path: '',
    component: StoreLayoutComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'object/:idSlug',
        component: ObjectPageComponent,
      },
      {
        path: 'object/:idSlug',
        component: GroupPageComponent,
      },
      {
        path: '**',
        component: NotFoundPageComponent,
      }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];

export default storeRoutes;
