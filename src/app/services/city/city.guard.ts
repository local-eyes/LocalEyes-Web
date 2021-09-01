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
      console.log(this.city);
    });
    if (this.city.toLowerCase() === 'jaipur') {
      return true;
    } else {
      this.router.navigate(['/launching-soon'])
      return false;
    }
  }

  getAddressDynamically(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.location.getPosition().then(pos => {
        this.location.getDynamicAddress(pos.lat, pos.lng).subscribe(res => {
          const addressList = res['results'][0]['address_components']
          addressList.forEach(address => {
            if (address.types.includes("locality")) {
              resolve(address['long_name']);
            }
          });
        })
      })
    })
  }
}
