// src/app/store/vehicle/vehicle.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { updateVehicleType, updateVehicleSubtype, updateVehicleImage } from './vehicle.actions';
import { initialVehicleState, VehicleState, ImageMap } from './vehicle.state';

export const vehicleReducer = createReducer(
  initialVehicleState,
  on(updateVehicleType, (state, { vehicleType }) => ({
    ...state,
    vehicleType,
    vehicleSubtype: '', // Reset subtype when vehicle type changes
    imageUrl: getImageUrl(vehicleType)
  })),
  on(updateVehicleSubtype, (state, { vehicleSubtype }) => ({
    ...state,
    vehicleSubtype
  })),
  on(updateVehicleImage, (state, { imageUrl }) => ({
    ...state,
    imageUrl
  }))
);

function getImageUrl(vehicleType: string): string {
  const imageMap: ImageMap = {
    auto: 'assets/auto.jpg',
    motor: 'assets/motor.jpg',
    scooter: 'assets/scooter.jpg'
  };
  return imageMap[vehicleType] || 'assets/auto.jpg';
}
