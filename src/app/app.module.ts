import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GeolocationService } from './geolocation.service';
import { DataService } from './data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { ListComponent } from './list/list.component';
import { CoffeeComponent } from './coffee/coffee.component';
import { Routes , RouterModule } from '@angular/router';
import { PmMaterialModule } from './material-module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: '', component: ListComponent
  },
  {
    path: 'coffee', component: CoffeeComponent
  },
  {
    path: 'coffee/:id', component: CoffeeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CoffeeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PmMaterialModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [GeolocationService , DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
