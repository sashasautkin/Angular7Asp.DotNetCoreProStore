import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from 'src/app/home/home.component';
import { UserService } from 'src/app/shared/user.service';
import { user } from './user';

@Component({
  selector: 'app-youritem',
  templateUrl: './youritem.component.html',
  styleUrls: []
})
export class YouritemComponent implements OnInit {

  user: user = new user();   // изменяемый товар
  users: user[];                // массив товаров
  tableMode: boolean = true;          // табличный режим
  toaster: any;


  constructor(private userService: UserService ,public homecomponent: HomeComponent,private toastr: ToastrService) { }

  ngOnInit() {
    this.loadUsers();
  }
  loadUsers(){
    this.userService.getUsers()
        .subscribe((data: user[]) => this.users = data);
  }
  delete(p: user) {
    if(p.userName != this.homecomponent.userDetails.userName){
    this.userService.deleteUser(p.id)
        .subscribe(data => this.loadUsers());
    }
    else
    {
      this.toaster.info('Info for users','You can not delete, because you are not admin');
    }
  }

}
