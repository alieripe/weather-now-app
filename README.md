# WeatherNowApp

The WeatherNowApp application can display the up-to-date weather of any city on cards, which are updated every 10 minutes. In its version 1.0 are displayed the cities of Nuuk, Urubici and Nairobi.

# Development

### Starting

* Preparing the environment - Prerequisites:

The prerequisites for the project are: node 6.9.0 or higher and npm 3 or higher

To prepare the environment, run:

```
npm install -g @angular/cli
```

To install the dependencies, run:

```
npm i
```

## Running the project in development mode:

To run in development mode, run:

```
ng serve
```

After the command is executed, access the browser at: http://localhost:4200 to access the application.

## Performing tests:

To perform tests, run:

```
ng test
```

## Building the project for production:

To build the project for production, run:

```
ng buid --prod
```

After the command finishes running the artifacts to deploy in the / dist directory.

## Tools used

* NodeJs - version 8.11.1
* Angular - version 5.2.0
* TypeScript - version 2.5.3
* [Angular CLI](https://github.com/angular/angular-cli) - Angular Command Line Interface - version 1.7
* [angular-persistence](https://github.com/darkarena1/angular-persistence/) - Caching service - version 1.0.1
* Protractor, Karma and Jasmine - for tests
* [Open Weather Map](https://openweathermap.org/) - Api used to get weather data for cities

## Architecture

The application was based on the following programming principles: DRY, SOLID and Clean Code.
The visual part was made using CSS3 with SCSS preprocessor.

* Models:

Climate: class that has weather data.

City: class that has the city data.

* Components

Header: Creates the top of the application.

AppComponent: create an application and display your pages.

WeatherCard: Create the weather cards according to the parameters you receive.

* Pages:

Home: Main page where weather cards are created according to a pre-defined list.

* Services:

WeatherService: Queries the OpenWeatherMap API and returns the requested city's climate.

## TODO
* Transform an application into a PWA;
* E2E implant tests;
