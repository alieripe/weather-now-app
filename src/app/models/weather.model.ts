import { City } from './city.model';

export class Weather {

    public id: number;
    public city: City;
    public humidity: number;
    public pressure: number;
    public timeUpdated: Date;
    public temperature: number;

    constructor(data?: any) {
        this.id = data.id || null;
        this.timeUpdated = new Date();
        this.city = new City(data) || null;
        this.temperature = Math.round(data.main.temp) || 0;
        this.humidity = Math.round(data.main.humidity) || null;
        this.pressure = Math.round(data.main.pressure) || null;
    }
}