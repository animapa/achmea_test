import { createAction, props } from '@ngrx/store';

export const updateVehicleType = createAction(
  '[Vehicle] Update Type',
  props<{ vehicleType: string }>()
);

export const updateVehicleSubtype = createAction(
  '[Vehicle] Update Subtype',
  props<{ vehicleSubtype: string }>()
);

export const updateVehicleImage = createAction(
  '[Vehicle] Update Image',
  props<{ imageUrl: string }>()
);
