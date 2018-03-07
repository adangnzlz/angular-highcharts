import map from 'lodash/fp/map';
import flow from 'lodash/fp/flow';
import groupby from 'lodash/fp/groupby';
import filter from 'lodash/fp/filter';
import CommonUtil from '../../utils/common.utils';
import { Companie } from '../../models/companie.model';


export default class OverviewUtil {
    commonUtil: CommonUtil;
    sectorNames: Array<String>;
    citiesNames: Array<String>;
    sectorIds: Array<Number>;
    companies: Array<Companie>;
    constructor(cities, sectors, companies) {
        this.commonUtil = new CommonUtil();
        this.companies = companies;
        this.citiesNames = this.commonUtil.getNamesArray(cities);
        this.sectorNames = this.commonUtil.getNamesArray(sectors);
        this.sectorIds = this.commonUtil.getIdsArray(sectors);
    }

    graphCompaniesBy(title, groupByField, groupNames): any {
        const series = this.formatDataCompaniesBy(groupByField, groupNames);
        const options = {
            chart: { plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false, type: 'pie', style: { fontFamily: 'monospace' } },
            title: { text: title },
            tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: series
        };
        return options;
    }

    formatDataCompaniesBy(groupByField, groupNames) {
        const series = [];
        const result = [];
        const totalCompanies = this.companies.length;
        let sizes = flow(
            groupby((item) => item[groupByField])
        )(this.companies);
        sizes = this.commonUtil.fillEmptyGroup(sizes, groupNames);
        sizes = map(item => item.length)(sizes);
        groupNames.forEach((element, index) => {
            result.push({
                name: element,
                y: sizes[index] / totalCompanies
            });
        });
        series.push({
            name: 'Companies',
            data: result,
        });
        return series;
    }



}
