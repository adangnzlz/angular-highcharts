import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { ConfigurableService } from '../../services/configurable.service';
import { environment } from '../../../environments/environment';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { City } from '../../models/city.model';
import { Companie } from '../../models/companie.model';
import { Sector } from '../../models/sector.model';
import CommonUtil from '../../utils/common.utils';
import OverviewUtil from './overview.util';



@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  overviewUtil: OverviewUtil;
  companies: Array<Companie>;
  cities: Array<City>;
  sectors: Array<Sector>;
  optionsPBSC: any;
  optionsCBC: any;
  optionsCBS: any;
  sectorNames: Array<String>;
  citiesNames: Array<String>;

  constructor(private configurableService: ConfigurableService, private commonUtil: CommonUtil) {
    forkJoin([
      this.configurableService.get(environment.api.cities),
      this.configurableService.get(environment.api.sectors),
      this.configurableService.get(environment.api.companies)
    ]).subscribe(results => {
      this.cities = results[0];
      this.sectors = results[1];
      this.companies = results[2];
      this.citiesNames = this.commonUtil.getNamesArray(this.cities);
      this.sectorNames = this.commonUtil.getNamesArray(this.sectors);

      // util class to format the data for the graphs
      this.overviewUtil = new OverviewUtil(this.cities, this.sectors, this.companies);

      this.optionsCBC = this.overviewUtil.graphCompaniesBy('Total companies, grouped by city', 'city_id', this.citiesNames);
      this.optionsCBS = this.overviewUtil.graphCompaniesBy('Total companies, grouped by sector', 'sector_id', this.sectorNames);
      this.optionsPBSC = this.overviewUtil.graphPeopleBySectorCity();
    });
  }
}
