import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { geoCodingAPI } from 'src/environments/environment';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
 lat:any;
 lng: any;
  constructor(private http: HttpClient, private snackbar: MatSnackBar) { 
    this.getPosition()
  }
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
        localStorage.setItem("latitude", `${resp.coords.latitude}`)
        localStorage.setItem("longitude", `${resp.coords.longitude}`)
        console.log(resp.coords.latitude, resp.coords.longitude);
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          console.log(err);
          this.snackbar.open(`❌ ${err.message}`, null,{verticalPosition: "top", horizontalPosition: "end"});
          reject(err);
        });
        // {enableHighAccuracy: true, timeout: 10000});
    });
  }
  getDynamicCity(lat, lng) {
    let params = new HttpParams()
    .set('latlng', `${lat},${lng}`)
    .set('key', geoCodingAPI)
    .set('result_type', 'locality')
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json`, {params})
  }

  getDynamicNeighborhood(lat, lng) {
    let params = new HttpParams()
    .set('latlng', `${lat},${lng}`)
    .set('key', geoCodingAPI)
    .set('result_type', 'sublocality')
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json`, {params})
  }
}
