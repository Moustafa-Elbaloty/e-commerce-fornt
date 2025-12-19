import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorDashboardComponent } from '../vendor/pages/vendor-dashboard/vendor-dashboard.component';

@NgModule({
  declarations: [
    VendorDashboardComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VendorRoutingModule
  ]
})
export class VendorModule {}
