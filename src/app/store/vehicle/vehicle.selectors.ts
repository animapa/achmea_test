import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VehicleState } from './vehicle.state';

export const selectVehicleState = createFeatureSelector<VehicleState>('vehicle');

export const selectVehicleType = createSelector(
  selectVehicleState,
  (state: VehicleState) => state.vehicleType
);

export const selectVehicleSubtype = createSelector(
  selectVehicleState,
  (state: VehicleState) => state.vehicleSubtype
);

export const selectVehicleImage = createSelector(
  selectVehicleState,
  (state: VehicleState) => state.imageUrl
);
