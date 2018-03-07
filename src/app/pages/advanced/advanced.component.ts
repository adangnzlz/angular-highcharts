import { environment } from '../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Companie } from '../../models/companie.model';
import { City } from '../../models/city.model';
import { Sector } from '../../models/sector.model';
import { ConfigurableService } from '../../services/configurable.service';
import { LoaderService } from '../../services/loader.service';
import AdvancedUtil from './advanced.util';
import { Subscription } from 'rxjs/Subscription';
import CommonUtil from '../../utils/common.utils';
import { CheckboxGroupComponent } from '../../components/checkbox-group/checkbox-group.component';
import { numberKey } from '../../utils/utils';

@Component({
    selector: 'app-advanced',
    templateUrl: './advanced.component.html',
    styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent {
    isNumberKey = numberKey;
    graphOptions = [
        { id: 1, name: 'Companies' },
        { id: 2, name: 'Measurements' }
    ];
    querySelected: number;
    companiesSelected: number[] = [];
    op: Subscription;
    advancedUtil: AdvancedUtil;
    checkboxGroup: FormGroup;
    enableGender = false;
    companiesModel: Array<Companie>;
    companiesModelSelect: Array<any> = [];
    citiesModel: Array<City>;
    cities: Array<City> = [];
    options: any;
    sectors: Array<Sector> = [];
    working = false;
    sectorsModel: Array<Sector>;
    @ViewChild('chSectors') chSectors: CheckboxGroupComponent;

    constructor(private loaderService: LoaderService, private _fb: FormBuilder, private configurableService: ConfigurableService,
        private commonUtil: CommonUtil) {
        this.advancedUtil = new AdvancedUtil();
        this.loaderService.displayLoader(true);
        forkJoin([
            this.configurableService.get(environment.api.cities),
            this.configurableService.get(environment.api.sectors),
            this.configurableService.get(environment.api.companies)
        ]).subscribe(results => {
            this.loaderService.displayLoader(false);
            this.citiesModel = results[0];
            this.sectorsModel = results[1];
            this.companiesModel = this.commonUtil.mapSectors(this.sectorsModel, results[2]);
        });
    }



    setSelectedCheckboxes(data, field): void {
        this[field] = data;
        // Update the companies in the ng-select restricted by sector
        if (field = 'sectors' && this.querySelected === 2) {
            const sectorIds = this.commonUtil.getIdsArray(this.sectors);
            const companiesIds = this.commonUtil.getIdsArray(this.companiesModelSelect);
            this.companiesModelSelect = this.companiesModel.filter(x => sectorIds.indexOf(x.sector_id) > -1);
            this.companiesSelected = this.companiesSelected.filter(x => companiesIds.indexOf(x) > -1);
        }
    }

    isButtonEnabled(): Boolean {
        if (this.querySelected) {
            switch (this.querySelected) {
                case 1:
                    return (this.cities.length + this.sectors.length > 0);
                case 2:
                    return this.sectors.length > 0;
            }
        } else {
            return false;
        }
    }

    calculate(): void {
        this.working = true;
        switch (this.querySelected) {
            case 1:
                this.calculateCompanies();
                break;
            case 2:
                this.calculateMeasurements();
                break;
        }
    }

    getUrlCompanies(): String {
        let url = environment.api.companies + '?';
        this.cities.forEach(element => {
            url += 'city_id=' + element.id + '&';
        });
        this.sectors.forEach(element => {
            url += 'sector_id=' + element.id + '&';
        });
        return url;
    }

    calculateCompanies(): void {
        this.options = null;
        const url = this.getUrlCompanies();
        this.op = this.configurableService.get(url).subscribe(result => {
            this.options = this.advancedUtil.graphCompanies(result, this.cities, this.sectors);
            this.working = false;
        }, error => {
            console.log(error);
            this.working = false;
        });
    }

    getUrlMeasurements(companiesToFilter): String {
        let url = environment.api.measurements + '?';
        companiesToFilter.forEach(element => {
            url += 'company_id=' + element.id + '&';
        });
        this.sectors.forEach(element => {
            url += 'sector_id=' + element.id + '&';
        });
        return url;
    }
    calculateMeasurements(): void {
        this.options = null;
        const companiesToFilter = this.commonUtil.getIdsSelected(this.companiesSelected, this.companiesModel);
        const url = this.getUrlMeasurements(companiesToFilter);
        this.op = this.configurableService.get(url).subscribe(result => {
            this.options = this.advancedUtil.graphMeasurements(result, companiesToFilter,
                this.sectors, this.enableGender);
            this.working = false;
        }, error => {
            console.log(error);
            this.working = false;
        });
    }

    selected(option): void {
        this.options = null;
        this.cities = [];
        this.sectors = [];
        if (this.chSectors) {
            this.chSectors.clear();
        }
        this.companiesSelected = [];
        if (this.op) {
            this.cancel();
        }
    }

    cancel(): void {
        this.op.unsubscribe();
        this.working = false;
    }

    randomSelect(): void {
        this.companiesSelected = [];
        for (let i = 0; i < 25; i++) {
            this.companiesSelected.push(this.companiesModel[Math.floor(Math.random() * this.companiesModel.length)].id);
        }
    }
    selectAll(): void {
        this.companiesSelected = (this.companiesModel.map(x => x.id));
    }

}
