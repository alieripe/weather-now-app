import { UpperCasePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs/Rx';
import { observable } from 'rxjs/symbol/observable';
import { Weather } from '../../models/weather.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})

export class WeatherCardComponent implements OnInit {

  @Input() cityName: string;
  @Input() isActive: boolean;
  @Input() countryName: string;

  public weather: Weather;
  public cityNameComplete: string;
  public isLoading: boolean = false;
  public showError: boolean = false;
  public intervalTimeInMinutes: number = 10;
  public intervalSubscription: Subscription;
  public cacheExpirationTimeInMinutes: number = 10;

  constructor(private _weatherService: WeatherService, private persistenceService: PersistenceService){
  }

  ngOnInit() {

    let timeInterval : number = this.intervalTimeInMinutes * 60000;
    this.cityNameComplete = this.cityName + ',' + this.countryName;
    this.getWeatherFromCard();

    this.intervalSubscription = Observable.interval(timeInterval).subscribe(x => {
      this.showError = false;
      this.isLoading = false;
      this.weather = null;
      this.getWeatherFromCard();
    });
  }

  ngOnDestroy() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  getClassDetailActive() {
    return this.isActive ? "show-details" : "hide-details";
  }

  showTemperature() {
    return this.weather && !this.isLoading && !this.showError;
  }

  getWeatherFromCard() {
    this.isLoading = true;

    setTimeout(() => {
      let weather: any|null = this.persistenceService.get(this.cityNameComplete, StorageType.LOCAL);
      if(weather){
        this.setWeatherInCard(weather);
      } else {
        this._weatherService.getWeatherByCity(this.cityNameComplete).subscribe(
          weather => {
            this.setWeatherInCard(weather);
            this.persistenceService.set(this.cityNameComplete, weather, {type: StorageType.LOCAL, expireAfter: this.cacheExpirationTimeInMinutes * 60 * 1000})
          },
          () => {
            this.setErrorInCard();
          }
        );
      }
    }, 1000);
  }

  setWeatherInCard(weather: Weather) {
    this.weather = weather;
    this.isLoading = false;
  }

  setErrorInCard() {
    this.showError = true;
    this.isLoading = false;
  }

  getClassFromTemperature() {
    if (this.weather.temperature <= 5) {
      return 'cold';
    } else if (this.weather.temperature > 26) {
      return 'hot';
    }
    return 'medium';
  }

 changeViewDetails() {
    this.isActive = !this.isActive;
  }
}
