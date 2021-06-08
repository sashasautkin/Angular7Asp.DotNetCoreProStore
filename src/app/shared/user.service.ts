import { Injectable } from '@angular/core';
import { FormBuilder, Validators, RequiredValidator, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { Createitem } from '../user/createitem/Createitem';
import { Bagproduct } from '../user/shoppingbag/Bagproduct';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router:Router,private fb:FormBuilder, private http:HttpClient) { }
  readonly BaseURI = 'http://localhost:2379/api';

  getProducts() {
    return this.http.get(this.BaseURI+'/Product/GetAllItem');

}
  getProductsFromShoppingBag(id: string) {   
    return this.http.get(this.BaseURI+'/ShoppingBag/get/' + id);

}
 getUsers(){
   return this.http.get(this.BaseURI+'/Admin/GetUsersForAdmin');

}

getcreateitem(id :string){
  return this.http.get(this.BaseURI+'/Product/get/'+id);
}
deleteShoppingBag(id: string) {
  return this.http.delete(this.BaseURI+'/ShoppingBag/Delete/' + id);
}
deleteCreateItem(id: string) {
  return this.http.delete(this.BaseURI+'/Product/Delete/' + id);
}

deleteProduct(id: string) {
  return this.http.delete(this.BaseURI+'/Product/Delete/' + id);
}

deleteUser(id:string){
  return this.http.delete(this.BaseURI + '/Admin/delete/' + id);
}

createItem(creproduct: Createitem) {
  return this.http.post(this.BaseURI + "/Product/post/", creproduct);
}

BuyItem(Bagproduct: Bagproduct) {
  return this.http.post(this.BaseURI + "/ShoppingBag/post/", Bagproduct);
}


public userDetails
ngOnInit() {
  this.getUserProfile().subscribe(
    res => {
    this.userDetails = res;
},
err => {
  console.log(err);
},
);

}


  formModel = this.fb.group({
    UserName :['',Validators.required],
    Email :['',Validators.email],
    FullName :[''],
    Passwords : this.fb.group({
      Password :['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword :['',Validators.required]
    },{validator : this.comparePasswords })
    
  });
  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if(confirmPswrdCtrl.errors ==null || 'passwordMismatch' in confirmPswrdCtrl.errors){
      if(fb.get('Password').value!= confirmPswrdCtrl.value)
      confirmPswrdCtrl.setErrors({passwordMismatch:true});
      else
      confirmPswrdCtrl.setErrors(null);
      

    }
  }
  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password    
    };
   return this.http.post(this.BaseURI + '/User/Register', body);

  }
  login(formData)
  {
    return this.http.post(this.BaseURI + '/User/Login', formData);
  }
  getUserProfile(){
    
   return this.http.get(this.BaseURI+'/UserProfile');
  }
}
