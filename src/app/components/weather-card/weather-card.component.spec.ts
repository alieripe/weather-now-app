import { By } from 'protractor/built';
import { Http, HttpModule } from '@angular/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherCardComponent } from './weather-card.component';
import { PersistenceService, StorageType } from 'angular-persistence';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;
  const carCorrect = { cityName: 'Nuuk,gl', isActive: false };
  const carIncorrect = { cityName: 'Teresopolis', isActive: false };

  beforeEach(async(() => {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    TestBed.configureTestingModule({
      declarations: [WeatherCardComponent],
      imports: [HttpModule],
      providers: [WeatherService, PersistenceService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(WeatherCardComponent);

    component = fixture.componentInstance;
    component.cityName = carCorrect.cityName;
    component.isActive = carCorrect.isActive;
    fixture.detectChanges();

  });

  it('should create', inject([Http, WeatherService], (Http, service: WeatherService) => {
    expect(component).toBeTruthy();
  }));

  it('should not show error', async () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.error')).toBeNull;
  });

  it('should show error', async () => {
    component.cityName = carIncorrect.cityName;
    component.isActive = carIncorrect.isActive;

    const fixture = TestBed.createComponent(WeatherCardComponent);
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.error')).toBeTruthy;
  });

  it('should leave the temperature in blue if a is less than or equal to 5', async () => {
    fixture.whenRenderingDone().then(() => {
      fixture.componentInstance.weather.temperature = 0;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.low')).toBeTruthy();
    });
  });

  it('should show the temperature in orange if above 6 and equal to or less than 25', async () => {
    fixture.whenRenderingDone().then(() => {
      fixture.componentInstance.weather.temperature = 20;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.medium')).toBeTruthy();
    });
  });

  it('should show the temperature in red if it is above 26', async () => {
    fixture.whenRenderingDone().then(() => {
      fixture.componentInstance.weather.temperature = 35;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.high')).toBeTruthy();
    });
  });
});
