import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updateVehicleType, updateVehicleSubtype } from '../../store/vehicle/vehicle.actions';
import { KentekenCheck } from 'rdw-kenteken-check';
import { Observable } from 'rxjs';
import { selectVehicleType, selectVehicleSubtype } from '../../store/vehicle/vehicle.selectors';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html'
})
export class VehicleFormComponent implements OnInit {
  vehicleForm!: FormGroup;
  selectedVehicleType$: Observable<string> | undefined;
  selectedVehicleSubtype$: Observable<string> | undefined;
  showSubtypes = true;
  licensePlateInvalid = false;
  formInvalid = false;

  autoSubtypes = ['Hatchback', 'Sedan', 'Station', 'Cabriolet', 'Coupé', 'MPV', 'Terreinauto'];
  motorSubtypes = ['All-road', 'Naked', 'Enduro', 'Race', 'Toermotor', 'Chopper', 'Zijspan'];

  constructor(private fb: FormBuilder, private store: Store, public kc: KentekenCheck) { }

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      vehicleType: ['', Validators.required],
      vehicleSubtype: [''],
      licensePlate: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]*$/)]]
    });

    this.selectedVehicleType$ = this.store.select(selectVehicleType);
    this.selectedVehicleSubtype$ = this.store.select(selectVehicleSubtype);

    this.vehicleForm.get('vehicleType')?.valueChanges.subscribe(value => {
      this.showSubtypes = value !== 'scooter';
      this.vehicleForm?.get('vehicleSubtype')?.setValidators(this.showSubtypes ? Validators.required : null);
      this.vehicleForm?.get('vehicleSubtype')?.updateValueAndValidity();
      this.store.dispatch(updateVehicleType({ vehicleType: value }));
    });

    this.vehicleForm.get('vehicleSubtype')?.valueChanges.subscribe(value => {
      this.store.dispatch(updateVehicleSubtype({ vehicleSubtype: value }));
    });
  }

  formatLicensePlate(): void {
    const licensePlate = this.vehicleForm?.get('licensePlate')?.value;
    const formattedPlate = this.formatPlate(licensePlate);
    this.vehicleForm?.get('licensePlate')?.setValue(formattedPlate);
    this.licensePlateInvalid = !this.kc.checkForbiddenCharacters(formattedPlate);
  }

  formatPlate(plate: string): string {
    if (plate.length === 6) {
      return `${plate.slice(0, 2)}-${plate.slice(2, 4)}-${plate.slice(4)}`.toUpperCase();
    } else {
      return plate;
    }
  }

  onSubmit(): void {
    if (this.vehicleForm?.invalid || this.licensePlateInvalid) {
      this.formInvalid = true;
    } else {
      this.formInvalid = false;
      // Handle form submission
    }
  }
}
