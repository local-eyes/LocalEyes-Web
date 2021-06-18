import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url:string = "https://us-central1-localeyes-95d0d.cloudfunctions.net";
  constructor(private http: HttpClient) { }

  getNearbyPosts(lat, lon, radius, sortBy:string) {
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('radius', radius)
    return this.http.get(`${this.url}/getNearbyPosts`, {params})
  }
}
