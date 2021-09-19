import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';

@Injectable({
  providedIn: 'root'
})
export class CityGuard implements CanActivate {
  city: string;
  constructor (private router: Router, private location: LocationService){ }
  
  async canActivate(): Promise<boolean> {
    await this.getAddressDynamically().then(city => {
      this.city = city;
    });
    if (this.city.toLowerCase() === 'jaipur') {
      return true;
    } else {
      this.router.navigate(['/launching-soon'], {queryParams: {city: this.city}})
      return false;
    }
  }

  getAddressDynamically(): Promise<any> {
    return new Promise((resolve, reject) => {
      const minutesSinceLastCall = Math.floor((new Date().getTime() - parseInt(localStorage.getItem("last_api_call"))) / 60000);
      if (localStorage.getItem("api_res") && minutesSinceLastCall < 30) {
        const res = JSON.parse(localStorage.getItem('api_res'));
        const addressList = res['results'][0]['address_components']
        addressList.forEach(address => {
          if (address.types.includes("administrative_area_level_2")) {
            const city = address['long_name'];
            resolve(city);
          }
        });
      } else {
        this.location.getPosition().then(pos => {
          this.location.getDynamicAddress(pos.lat, pos.lng).subscribe(res => {
            localStorage.setItem("api_res", JSON.stringify(res));
            localStorage.setItem("last_api_call", `${new Date().getTime()}`);
            const addressList = res['results'][0]['address_components']
            addressList.forEach(address => {
              if (address.types.includes("administrative_area_level_2")) {
                resolve(address['long_name']);
              }
            });
          })
        })
      }
    })
  }
}
