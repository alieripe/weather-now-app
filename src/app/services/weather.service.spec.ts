import { Weather } from '../models/weather.model';
import { WeatherService } from './weather.service';
import { MockBackend } from '@angular/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [WeatherService, { provide: XHRBackend, useClass: MockBackend }],

    });
  });

  describe('getWeatherByCity()', () => {
    it('should return an Observable<Weather>', 
      inject([WeatherService, XHRBackend], (service: WeatherService, mockBackend) => {

      const weatherOption = { cityName: 'Teresopolis,rj' };

      const mockResponse = {
            "coord": {
                "lon": -53.74,
                "lat": 24.17
            },
            "weather": [{
                "id": 942,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03d"
            }],
            "base": "stations",
            "main": {
                "temp": -7.78,
                "pressure": 187.79,
                "humidity": 236,
                "temp_min": -3.34,
                "temp_max": -2.57,
                "sea_level": 1435.85,
                "grnd_level": 3137.7
            },
            "wind": {
                "speed": 333.3242,
                "deg": 23425.023423
            },
            "clouds": {
                "all": 678
            },
            "dt": 4232344237,
            "sys": {
                "message": 0.0494,
                "country": "GL",
                "sunrise": 1231232176,
                "sunset": 2131231231
            },
            "id": 3421319,
            "name": "Nuuk",
            "cod": 23433

      };

      mockBackend.connections.subscribe((connection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      service.getWeatherByCity(weatherOption.cityName).subscribe((weather: Weather) => {
        expect(weather).toBeDefined();
      });
    }));
  });
});
