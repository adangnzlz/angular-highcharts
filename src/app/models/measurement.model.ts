
export class Measurement {
    id: number;
    company_id: number;
    male: number;
    female: number;
    total: number;
    sector_id: number;
    date: Date;
    name: string;
    constructor(id: number, company_id: number, male: number, female: number, total: number, sector_id: number, date: Date, name: string) {
        this.id = id;
        this.company_id = company_id;
        this.male = male;
        this.female = female;
        this.total = total;
        this.sector_id = sector_id;
        this.date = date;
        this.name = name;
    }
}
