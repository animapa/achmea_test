import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { updateVehicleType, updateVehicleImage } from './vehicle.actions';
import { ImageMap } from './vehicle.state';

@Injectable()
export class VehicleEffects {
  updateVehicleImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateVehicleType),
      map(action => {
        const imageMap: ImageMap = {
          auto: 'assets/auto.jpg',
          motor: 'assets/motor.jpg',
          scooter: 'assets/scooter.jpg'
        };
        return updateVehicleImage({ imageUrl: imageMap[action.vehicleType] });
      })
    )
  );

  constructor(private actions$: Actions) {}
}
