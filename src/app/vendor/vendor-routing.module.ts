import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendorDashboardComponent } from './pages/vendor-dashboard/vendor-dashboard.component';
// import { UploadProductComponent } from './pages/upload-product/upload-product.component';
// import { MyProductsComponent } from './pages/my-products/my-products.component';
import { VendorGuard } from './guards/vendor-guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [VendorGuard],
    children: [
      {
        path: 'dashboard',
        component: VendorDashboardComponent,
      },
      // {
      //   path: 'upload-product',
      //   component: UploadProductComponent,
      // },
      // {
      //   path: 'my-products',
      //   component: MyProductsComponent,
      // },
      // {
      //   path: '',
      //   redirectTo: 'dashboard',
      //   pathMatch: 'full',
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutingModule {}
