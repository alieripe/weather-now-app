import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';

import { PersistenceModule } from 'angular-persistence';
import { WeatherService } from './services/weather.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, WeatherCardComponent],
  imports: [BrowserModule, AppRoutingModule, HttpModule, CommonModule, PersistenceModule],
  providers: [WeatherService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {}