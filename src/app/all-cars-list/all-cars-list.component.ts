import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-all-cars-list',
  templateUrl: './all-cars-list.component.html',
  styleUrls: ['./all-cars-list.component.css']
})
export class AllCarsListComponent implements OnInit {

  cars:any
  owner:any

  constructor(private carService: CarService,
    private giphyService: GiphyService,
    private ownerService: OwnerService) { }

  ngOnInit() {
    this.carService.getAllCars().subscribe(data =>{
      this.cars = data._embedded.cars;
      for(const car of this.cars){
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
        this.ownerService.get(car.id).subscribe(data => this.owner=data);
      }
    });
  }

}
