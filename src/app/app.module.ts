import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { AppComponent } from './app.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { AdvancedComponent } from './pages/advanced/advanced.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { ChartModule } from 'angular2-highcharts';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurableService } from './services/configurable.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import CommonUtil from './utils/common.utils';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxGroupComponent } from './components/checkbox-group/checkbox-group.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { SpinnerModule } from 'angular2-spinner';
import { LoaderService } from './services/loader.service';
import { NgSelectModule } from '@ng-select/ng-select';
declare var require: any;

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    AdvancedComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    CheckboxGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SpinnerModule,
    UiSwitchModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ChartModule.forRoot(require('highcharts')),
    Angular2FontawesomeModule
  ],
  providers: [ConfigurableService, LoaderService, CommonUtil],
  bootstrap: [AppComponent]
})
export class AppModule { }
