// src/app/store/index.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { vehicleReducer } from './vehicle/vehicle.reducer';
import { VehicleEffects } from './vehicle/vehicle.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({ vehicle: vehicleReducer }),
    EffectsModule.forRoot([VehicleEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
})
export class AppStoreModule {}
