import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {

  sub: Subscription;
  owner: any = {}

  constructor(private router: Router,
    private route: ActivatedRoute,
    private carService: CarService,
    private ownerService: OwnerService,
    private giphyService: GiphyService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.ownerService.get(id).subscribe((owner: any) => {
          if(owner){
            this.owner = owner;
            this.owner.href = owner._links.self.href;
            this.giphyService.get(owner.name).subscribe(url => owner.giphyUrl = url);
          } else {
            console.log(`Owner with id '${id}' not found, returning to list`);
            this.goToList();
          }
        });
      }
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  goToList(){
    this.router.navigate(['/owner-list']);
  }

  save(form: NgForm){
    this.ownerService.save(form).subscribe(result => {
      console.log(form);
      this.goToList();
      
    }, error => console.error(error));
  }

  remove(href){
    this.ownerService.getHref(href).subscribe((owner: any) => {
      if(owner){
        this.owner = owner;
        console.log(owner.dni);
        //Hace un efecto raro, que no logré solucionar a tiempo pero por ahí iba la cosa de desligar el owner.
        //this.carService.removeOwner(owner.dni);
      }
    });
    this.ownerService.remove(href).subscribe(result => {
      this.goToList();
    }, error => console.error(error));
  }


}
