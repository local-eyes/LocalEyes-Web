import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  currLat: any;
  currLng: any;

  constructor() { }

  ngOnInit(): void {
    this.getPosition().then(pos=>
      {
        this.currLng = pos.lng;
        this.currLat = pos.lat;
         console.log(`Positon: ${pos.lng} ${pos.lat}`);
      });
    
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }



}
