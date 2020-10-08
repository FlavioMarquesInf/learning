import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// services
import * as fromServices from './services';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('objects', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services]
})
export class ProductsModule {}
