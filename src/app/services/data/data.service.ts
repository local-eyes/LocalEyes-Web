import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { prodURL } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  devURL: string = "http://localhost:5001/localeyes-95d0d/us-central1/localEyesFunctions";
  constructor(private http: HttpClient) { }

  getNearbyPosts(lat:any, lon:any, radius:any, sortBy:string) {
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('radius', radius)
    .set('sortBy', sortBy)
    console.log(`${prodURL}/getNearbyPosts, ${params}`);
    
    return this.http.get(`${prodURL}/getNearbyPosts`, {params})
  }

  getCityPosts(city:string) {
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

  getProfile(uid:string) {
    let params = new HttpParams()
    .set('uid', uid)

    return this.http.get(`${prodURL}/getProfile`, {params})
  }

  getNearbyUnanswered(lat:any, lon:any, radius:any) {
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('radius', radius)

    return this.http.get(`${prodURL}/getNearbyUnanswered`, {params})
  }

  getCityUnanswered(city:string) {
    let params = new HttpParams()
    .set('city', city)

    return this.http.get(`${prodURL}/getCityUnanswered`, {params})
  }
}
