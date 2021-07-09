import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
 lat:any;
 lng: any;
  constructor() { 
    this.getPosition()
  }
  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
        localStorage.setItem("latitude", `${resp.coords.latitude}`)
        localStorage.setItem("longitude", `${resp.coords.longitude}`)
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }
}
