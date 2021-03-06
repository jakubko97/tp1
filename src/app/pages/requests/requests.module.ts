import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestsPageRoutingModule } from './requests-routing.module';

import { RequestsPage } from './requests.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RequestsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    TranslateModule.forChild()
  ],
  declarations: [RequestsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RequestsPageModule {}
