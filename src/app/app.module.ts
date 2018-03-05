import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { AppComponent } from './app.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { OtherComponent } from './pages/other/other.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { ChartModule } from 'angular2-highcharts';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurableService } from './services/configurable.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import CommonUtil from './utils/common.utils';
import CitiesUtil from './utils/cities.util';
import SectorsUtil from './utils/sectors.util';
import MeasurementsUtil from './utils/measurements.util';
import CompaniesUtil from './utils/companies.util';
declare var require: any;

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    OtherComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ChartModule.forRoot(require('highcharts')),
    Angular2FontawesomeModule
  ],
  providers: [ConfigurableService, CommonUtil, CitiesUtil, SectorsUtil, CompaniesUtil, MeasurementsUtil],
  bootstrap: [AppComponent]
})
export class AppModule { }
