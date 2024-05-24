import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { VehicleFormComponent } from './vehicle-form.component';
import { KentekenCheck } from 'rdw-kenteken-check';
import { selectVehicleType, selectVehicleSubtype } from '../../store/vehicle/vehicle.selectors';
import { updateVehicleType, updateVehicleSubtype } from '../../store/vehicle/vehicle.actions';

describe('VehicleFormComponent', () => {
  let component: VehicleFormComponent;
  let fixture: ComponentFixture<VehicleFormComponent>;
  let store: Store;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleFormComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({})],
      providers: [KentekenCheck]
    }).compileComponents();

    store = TestBed.inject(Store);
    fb = TestBed.inject(FormBuilder);

    spyOn(store, 'dispatch').and.callFake(() => { });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default values and subscribe to selected vehicle type and subtype', () => {
    spyOn(store, 'select').and.returnValues(of('auto'), of('Hatchback'));

    component.ngOnInit();

    expect(component.vehicleForm.get('vehicleType')?.value).toEqual('auto');
    expect(component.vehicleForm.get('vehicleSubtype')?.value).toEqual('Hatchback');
  });

  it('should dispatch updateVehicleType action on vehicleType value change', () => {
    spyOn(store, 'select').and.returnValue(of('auto'));
    component.ngOnInit();
    const vehicleTypeControl = component.vehicleForm.get('vehicleType');
    vehicleTypeControl?.setValue('motor');
    expect(store.dispatch).toHaveBeenCalledWith(updateVehicleType({ vehicleType: 'motor' }));
  });

  it('should dispatch updateVehicleSubtype action on vehicleSubtype value change', () => {
    spyOn(store, 'select').and.returnValues(of('auto'), of('Hatchback'));
    component.ngOnInit();
    const vehicleSubtypeControl = component.vehicleForm.get('vehicleSubtype');
    vehicleSubtypeControl?.setValue('Sedan');
    expect(store.dispatch).toHaveBeenCalledWith(updateVehicleSubtype({ vehicleSubtype: 'Sedan' }));
  });

});
