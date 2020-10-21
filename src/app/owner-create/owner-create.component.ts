import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.css']
})
export class OwnerCreateComponent implements OnInit {

  owner: any = {};

  constructor(private route: Router,
              private ownerService: OwnerService) { }

  ngOnInit() {
  }

  save(form: NgForm){
    this.ownerService.save(form).subscribe(result =>{
      this.goToList();
    }, error => console.log(error));
  }

  goToList(){
    this.route.navigate(['/owner-list']);
  }
}
