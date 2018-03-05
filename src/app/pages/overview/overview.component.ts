import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { ConfigurableService } from '../../services/configurable.service';
import { environment } from '../../../environments/environment';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { City } from '../../models/city.model';
import { Companie } from '../../models/companie.model';
import { Sector } from '../../models/sector.model';
import CommonUtil from '../../utils/common.utils';
import * as _ from 'lodash';
import map from 'lodash/fp/map';
import flow from 'lodash/fp/flow';
import groupby from 'lodash/fp/groupby';
import filter from 'lodash/fp/filter';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {


  sectorIds: Array<Number>;
  citiesNames: Array<String>;
  sectorNames: Array<String>;
  companies: Array<Companie>;
  cities: Array<City>;
  sectors: Array<Sector>;
  options: any;

  constructor(private configurableService: ConfigurableService, private commonUtil: CommonUtil) {
    this.initDataAndCreateGraph();
  }

  initDataAndCreateGraph() {
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
      this.sectorIds = this.commonUtil.getIdsArray(this.sectors);
      this.createGraphs();
    });
  }

  ngOnInit() {
  }


  createGraphs(): any {
    this.gPeopleBySectorCity();
  }


  gPeopleBySectorCity(): any {
    const series = [];



    this.sectorNames.forEach((element, index) => {
      const result = flow(
        filter((item) => item.sector_id === this.sectorIds[index]),
        groupby((item) => item.city_id),
        map((item) => item.length)
      )(this.companies);
      console.log(result);

      series.push({
        name: element,
        data: result,
      });
    });

    this.options = {
      chart: { type: 'column' },
      title: { text: 'Total companies, grouped by sector and city' },
      xAxis: { categories: this.citiesNames },
      yAxis: {
        allowDecimals: false, min: 0,
        title: { text: 'Number of companies' },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'white'
          }
        }

      },
      series: series
    };
  }

}
