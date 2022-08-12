import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { geoCodingAPI } from 'src/environments/environment';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
 lat:any;
 lng: any;
  constructor(
    @Inject(PLATFORM_ID)
    private platformId: any,
    private http: HttpClient, 
    private snackbar: MatSnackBar
    ) { }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (isPlatformBrowser(this.platformId)) {
        navigator.geolocation.getCurrentPosition(resp => {
          localStorage.setItem("latitude", `${resp.coords.latitude}`)
          localStorage.setItem("longitude", `${resp.coords.longitude}`)
            resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
          },
          err => {
            console.log(err);
            this.snackbar.open(`❌ ${err.message}`, null,{verticalPosition: "top", horizontalPosition: "end"});
            reject(err);
          },
          {enableHighAccuracy: true, timeout: 10000});
      }else {
        console.log("Browser not supported");
        resolve({lng: 26.9124, lat: 75.7873});
      }
    });
  } 
  
  getDynamicAddress(lat, lng) {
    if (isPlatformBrowser(this.platformId)) {
      let params = new HttpParams()
      .set('latlng', `${lat},${lng}`)
      .set('key', geoCodingAPI)
      .set('result_type', 'sublocality|political')
      console.info("GOOGLE API CALLED")
      console.log(`https://maps.googleapis.com/maps/api/geocode/json`, {params})
      return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json`, {params})
    } else {
      return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=26.9124,75.7873&key=AIzaSyDdBGKa4y35oLNIppUD4M3NMhLW2aU1eb8&result_type=sublocality|political")
    }
  }
}