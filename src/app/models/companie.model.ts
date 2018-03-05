
export class Companie {
    id: number;
    city_id: number;
    sector_id: number;
    name: string;
    constructor(id: number, city_id: number, sector_id: number, name: string) {
        this.id = id;
        this.city_id = city_id;
        this.sector_id = sector_id;
        this.name = name;
    }
}

