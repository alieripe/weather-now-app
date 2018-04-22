import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Weather } from '../models/weather.model';

@Injectable()
export class WeatherService {

  private units = 'metric';
  private keyApi = '822c49033328aefdde4faa6f129aacdd';
  private urlApi = 'http://api.openweathermap.org/data/2.5/weather';

  constructor(private _http: Http) { }

  public getWeatherByCity(cityNameComplete: string): Observable<Weather> {
    return this.requestApi({ q: cityNameComplete });
  }

  public requestApi(params: any) {
    params.APPID = this.keyApi;
    params.units = this.units;

    return this._http.get(this.urlApi, {
      params: params
    }).map(data => this.transformToModel(data.json()));
  }

  public transformToModel(data: Response): Weather {
    return new Weather(data);
  }
}
