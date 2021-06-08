import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from 'src/app/home/home.component';
import { UserService } from 'src/app/shared/user.service';
import { Bagproduct } from '../shoppingbag/Bagproduct';
import { Product } from './product';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  providers: [UserService]
})
export class ItemComponent implements OnInit {

  product: Product = new Product();   // изменяемый товар
    products: Product[];                // массив товаров
    tableMode: boolean = true;          // табличный режим

  constructor(private userService: UserService,public homecomponent: HomeComponent,private toaster:ToastrService) { }

  ngOnInit() {
    this.loadProducts();
    
  }
  loadProducts() {
    this.userService.getProducts()
        .subscribe((data: Product[]) => this.products = data);
  }
  delete(p: Product) {
    if(this.homecomponent.userDetails.userName == "admin"){
    this.userService.deleteCreateItem(p.id)
        .subscribe(data => this.loadProducts());
    }
    else{
      this.toaster.info('Info for users','You can not delete, because you are not admin');
    }
  }

bagproduct
BuyProduct(p: Product) {
  if (p.userId != this.homecomponent.userDetails.id){
  this.bagproduct   = new Bagproduct();
  this.bagproduct.userId = this.homecomponent.userDetails.id;
  this.bagproduct.userName = this.homecomponent.userDetails.userName;
  this.bagproduct.price = p.price;
  this.bagproduct.productName = p.productName;
  this.bagproduct.customerName = p.userName;
  if (this.bagproduct.id == null) {
    this.userService.BuyItem(this.bagproduct)
        .subscribe((data: Bagproduct) => this.bagproduct.push(data));
    }

    }else{
    this.toaster.info('Info for users','You can not buy own items');
    } 

  }
  


}
