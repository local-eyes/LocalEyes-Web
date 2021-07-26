import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { prodURL } from "../../../environments/environment";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  devURL: string = "http://localhost:5001/localeyes-95d0d/us-central1/localEyesFunctions";
  constructor(
    private http: HttpClient,
    private db: AngularFirestore
    ) { }

  getNearbyPosts(lat:any, lon:any, radius:any, sortBy:string) {
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('radius', radius)
    .set('sortBy', sortBy)

    return this.http.get(`${prodURL}/getNearbyPosts`, {params})
  }

  getCityPosts(city:string) {
    let params = new HttpParams()
    .set('city', city)
    
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

  getUserLocalFeed(uid:string) {
    let params = new HttpParams()
    .set('uid', uid)

    return this.http.get(`${prodURL}/getUserLocalFeed`, {params})
  }
  getUserCityFeed(uid:string) {
    let params = new HttpParams()
    .set('uid', uid)

    return this.http.get(`${prodURL}/getUserCityFeed`, {params})
  }
  getAnswersFeed(uid:string) {
    let params = new HttpParams()
    .set('uid', uid)

    return this.http.get(`${prodURL}/getUserAnswers`, {params})
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

  getNotifications(uid:string): Observable<any> {
    return this.db.collection("notifications", ref => ref.where('to', 'in', [uid, 'all'])).snapshotChanges()
      .pipe(map(snaps => {
        return snaps.map(snap => {
          return snap.payload.doc.data()
        })
      }))
  }
}
