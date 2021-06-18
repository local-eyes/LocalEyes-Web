import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  currLat: any;
  currLng: any;

  constructor(private location: LocationService) { }

  ngOnInit(): void {
    this.location.getPosition().then(pos=>
      {
        this.currLng = pos.lng;
        this.currLat = pos.lat;
         console.log(`Positon: ${pos.lng} ${pos.lat}`);
      });
    
  }

}
