export interface VehicleState {
    vehicleType: string;
    vehicleSubtype: string;
    imageUrl: string;
}

export const initialVehicleState: VehicleState = {
    vehicleType: '',
    vehicleSubtype: '',
    imageUrl: 'assets/auto.jpg'
};

export type ImageMap = {
    [key: string]: string;
};
  

