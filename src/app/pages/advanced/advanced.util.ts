import map from 'lodash/fp/map';
import flow from 'lodash/fp/flow';
import groupby from 'lodash/fp/groupby';
import includes from 'lodash/fp/includes';
import filter from 'lodash/fp/filter';
import CommonUtil from '../../utils/common.utils';
import { Companie } from '../../models/companie.model';


export default class AdvancedUtil {
    commonUtil: CommonUtil;
    constructor() {
        this.commonUtil = new CommonUtil();
    }
    graphCompanies(companies, cities, sectors): any {
        const options = {
            chart: { inverted: true },
            title: { text: 'Companies chart' },
            xAxis: {},
            yAxis: {},
            labels: { items: [{ style: { left: '50px', top: '18px', color: 'black' } }] },
            series: []
        };
        return this.attachSeriesCompaniesAndConfigure(options, companies, cities, sectors);

    }

    attachSeriesCompaniesAndConfigure(options, companies, cities, sectors) {
        if (cities.length === 0) {
            options.series = this.formatDataCompaniesBySector(companies, sectors);
            options.xAxis = { categories: this.commonUtil.getNamesArray(sectors) };
            delete options.yAxis;
        } else if (sectors.length === 0) {
            options.series = this.formatDataCompaniesByCity(companies, cities);
            options.xAxis = { categories: this.commonUtil.getNamesArray(cities) };
            delete options.yAxis;
        } else {
            options.chart.inverted = false;
            options.series = this.formatDataCompaniesByCitySector(companies, cities, sectors);
            options.xAxis = { categories: this.commonUtil.getNamesArray(cities) };
            options.yAxis = { allowDecimals: false, min: 0, title: { text: 'Number of companies' } };
        }
        return options;
    }

    formatDataCompaniesBySector(companies, sectors) {
        const sectorIds = this.commonUtil.getIdsArray(sectors);
        let result = groupby((item) => item.sector_id)(companies);
        result = this.commonUtil.fillEmptyGroup(result, sectors);
        result = map(item => item.length)(result);
        const series = [{ type: 'column', colorByPoint: true, data: result, showInLegend: false }];
        return series;
    }

    formatDataCompaniesByCity(companies, cities) {
        const citiesIds = this.commonUtil.getIdsArray(cities);
        let result = groupby((item) => item.city_id)(companies);
        result = this.commonUtil.fillEmptyGroup(result, cities);
        result = map(item => item.length)(result);
        const series = [{ type: 'column', colorByPoint: true, data: result, showInLegend: false }];
        return series;
    }

    formatDataCompaniesByCitySector(companies, cities, sectors) {
        const citiesNames = this.commonUtil.getNamesArray(cities);
        const sectorNames = this.commonUtil.getNamesArray(sectors);
        const sectorIds = this.commonUtil.getIdsArray(sectors);
        const citiesIds = this.commonUtil.getIdsArray(cities);
        const series = [];
        sectorNames.forEach((element, index) => {
            let result = flow(
                filter((item) => item.sector_id === sectorIds[index]),
                groupby((item) => item.city_id)
            )(companies);
            result = this.commonUtil.fillEmptyGroup(result, cities);
            result = map(item => item.length)(result);
            series.push({ name: element, data: result, type: 'column' });
        });
        return series;
    }

    graphMeasurements(measurements, companies, sectors, enableGender) {
        const options = {
            chart: { type: 'bar', inverted: true },
            title: { text: 'Masurements chart' },
            xAxis: { categories: this.commonUtil.getNamesArray(sectors) },
            legend: { reversed: true },
            plotOptions: { series: { stacking: 'normal' } },
            labels: { items: [{ style: { left: '50px', top: '18px', color: 'black' } }] },
            series: this.formatDataMeasurementsBySector(measurements, sectors, enableGender)
        };
        return options;
    }

    formatDataMeasurementsBySector(measurements, sectors, enableGender) {
        const sectorIds = this.commonUtil.getIdsArray(sectors);
        let result = flow(
            groupby((item) => item.sector_id))
            (measurements);
        result = this.commonUtil.fillEmptyGroup(result, sectors);
        const series = [];
        if (enableGender) {
            const resultM = this.getDataSerie(result, 'male');
            const resultF = this.getDataSerie(result, 'female');
            series.push(this.createSerie('Male', resultM));
            series.push(this.createSerie('Female', resultF));
        } else {
            const resultT = this.getDataSerie(result, 'total');
            series.push(this.createSerie('Female', resultT));
        }
        return series;
    }

    createSerie(name, data) {
        return { name: name, type: 'column', colorByPoint: true, data: data, showInLegend: true };
    }

    getDataSerie(data, field): Number[] {
        const result = map(item => {
            let count = 0;
            item.forEach(element => {
                count += element[field];
            });
            return count;
        })(data);
        return result;
    }
}
