import { Component, Input, OnInit } from '@angular/core';
import { HomeComponent } from 'src/app/home/home.component';
import { UserService } from 'src/app/shared/user.service';
import { Createitem } from './Createitem';



@Component({
  
  selector: 'app-createitem',
  templateUrl: './createitem.component.html',
  providers: [UserService] ,
  
})



export class CreateitemComponent implements OnInit {

  @Input()
    
  creproduct: Createitem = new Createitem();   // изменяемый товар
    creproducts: Createitem[];                // массив товаров
    tableMode: boolean = true;          // табличный режим
    
  constructor(private userService: UserService,private service:UserService,public homecomponent: HomeComponent) { }
  
  ngOnInit() {
   
    this.loadcreateitem();
    
  }
  userDetail = this.homecomponent.userDetails;
  userName = this.homecomponent.userDetails.userName;
  loadcreateitem() {
    this.userService.getcreateitem(this.homecomponent.userDetails.id)
        .subscribe((data: Createitem[]) => this.creproducts = data);

  }
  delete(p: Createitem) {
    this.userService.deleteCreateItem(p.id)
        .subscribe(data => this.loadcreateitem());
  }
  cancel() {
    this.creproduct = new Createitem();
    this.creproduct.userId = this.homecomponent.userDetails.id;
    this.creproduct.userName = this.homecomponent.userDetails.userName;
    this.tableMode = true;
    
  }
  add() {
    this.cancel();
    this.tableMode = false;
    
}
save() {
  if (this.creproduct.id == null) {
      this.userService.createItem(this.creproduct)
          .subscribe((data: Createitem) => this.creproducts.push(data));
  } 
  this.cancel();
}

}
