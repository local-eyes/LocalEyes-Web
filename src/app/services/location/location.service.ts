import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { geoCodingAPI } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
 lat:any;
 lng: any;
  constructor(private http: HttpClient) { 
    this.getPosition()
  }
  getPosition(): Promise<any> {
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
  getDynamicCity(lat, lng) {
    let params = new HttpParams()
    .set('latlng', `${lat},${lng}`)
    .set('key', geoCodingAPI)
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json`, {params})
  }
}
