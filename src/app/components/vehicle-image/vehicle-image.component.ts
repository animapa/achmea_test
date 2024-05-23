import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectVehicleImage } from '../../store/vehicle/vehicle.selectors';

@Component({
  selector: 'app-vehicle-image',
  templateUrl: './vehicle-image.component.html'
})
export class VehicleImageComponent implements OnInit {
  imageUrl$: Observable<string> | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.imageUrl$ = this.store.select(selectVehicleImage);
  }
}
