import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import {GiphyService} from '../shared/giphy/giphy.service';
import { Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owners: Array<any>
  selectedOptions: string[] = [];
  cars: Array<any>

  constructor(private ownerService: OwnerService,
    private giphyService: GiphyService,
    private router: Router,
    private carService: CarService) {

  }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
      for (const owner of this.owners){
        if(owner.dni != null){
          this.giphyService.get(owner.name).subscribe(url => owner.giphyUrl = url);
        }
      }
    });
  }

  goToList(){
    this.router.navigate(['/owner-list']);
  }

  remove(){
    for(const href of this.selectedOptions){
      this.ownerService.getHref(href).subscribe((owner: any) =>{
        if(owner){
          //this.carService.removeOwner(owner.dni);
        }
      });
      this.ownerService.remove(href).subscribe(result =>{
        console.log(href);
        
      }, error => console.error(error));
    }
    window.location.reload();
    //this.router.navigate(['/owner-list'])
  } 



}
