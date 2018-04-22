export class City {

    public id: number;
    public name: string;
    public country: string;
    public coordinates: Object;

    constructor(data?: any) {
        this.id = data.id || null;
        this.name = data.name || null;
        this.coordinates = data.coord || null;
        this.country = data.sys.country || null;
    }
}