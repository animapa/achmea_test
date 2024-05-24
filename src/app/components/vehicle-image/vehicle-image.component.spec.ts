import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { VehicleImageComponent } from './vehicle-image.component';
import { selectVehicleImage } from '../../store/vehicle/vehicle.selectors';

describe('VehicleImageComponent', () => {
  let component: VehicleImageComponent;
  let fixture: ComponentFixture<VehicleImageComponent>;
  let store: MockStore;
  const mockImageUrl = 'https://example.com/vehicle.jpg';
  const initialState = {
    vehicle: {
      imageUrl: mockImageUrl
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleImageComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            { selector: selectVehicleImage, value: mockImageUrl }
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(VehicleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select the image URL from the store on init', () => {
    component.ngOnInit();
    component.imageUrl$?.subscribe(imageUrl => {
      expect(imageUrl).toBe(mockImageUrl);
    });
  });
});
