import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cardsList: Object[] = [];

  constructor() {}

  ngOnInit() {
    this.cardsList = [
      {
        cityName: 'Nuuk',
        countryName: 'gl',
        isActive: false
      }, {
        cityName: 'Urubici',
        countryName: 'br',
        isActive: true
      }, {
        cityName: 'Nairobi',
        countryName: 'ke',
        isActive: false
      }
    ];
  }
}
