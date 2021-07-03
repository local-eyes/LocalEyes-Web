import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { prodURL } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  devURL: string = "http://localhost:5001/localeyes-95d0d/us-central1/localEyesFunctions";
  constructor(private http: HttpClient) { }

  getNearbyPosts(lat, lon, radius, sortBy) {
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('radius', radius)
    .set('sortBy', sortBy)
    console.log(`${prodURL}/getNearbyPosts, ${params}`);
    
    return this.http.get(`${prodURL}/getNearbyPosts`, {params})
  }

  getCityPosts(city) {
    let params = new HttpParams()
    .set('city', city)
    console.log(`${prodURL}/getCityPosts, ${params}`);
    return this.http.get(`${prodURL}/getCityPosts`, {params})
  }

  getAnswers(postId: string) {
    let params = new HttpParams()
    .set('postId', postId)

    return this.http.get(`${prodURL}/answers`, {params})
  }

  getSinglePost(postId:string, collection: string) {
    let params = new HttpParams()
    .set('collection', collection)
    .set('postId', postId)

    return this.http.get(`${prodURL}/getPost`, {params})
  }
}
