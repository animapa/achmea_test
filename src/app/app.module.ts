import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleImageComponent } from './components/vehicle-image/vehicle-image.component';
import { AppStoreModule } from './store';
import { KentekenCheck } from 'rdw-kenteken-check';
import { FormatInputPipe } from './format-input.pipe';

@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    VehicleImageComponent,
    FormatInputPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppStoreModule
  ],
  providers: [KentekenCheck],
  bootstrap: [AppComponent]
})
export class AppModule {}
