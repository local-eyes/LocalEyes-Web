import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  prodURL: string = "https://us-central1-localeyes-95d0d.cloudfunctions.net";
  devURL: string = "http://localhost:5001/localeyes-95d0d/us-central1/localEyesFunctions";
  constructor(private http: HttpClient) { }

  getNearbyPosts(lat, lon, radius, sortBy="") {
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('radius', radius)
    console.log(`${this.devURL}/getNearbyPosts, ${params}`);
    
    return this.http.get(`${this.devURL}/getNearbyPosts`, {params})
  }
}
