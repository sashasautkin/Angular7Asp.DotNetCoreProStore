import { Component, OnInit } from '@angular/core';
import { HomeComponent } from 'src/app/home/home.component';
import { UserService } from 'src/app/shared/user.service';
import { Bagproduct } from './Bagproduct';
@Component({
  selector: 'app-shoppingbag',
  templateUrl: './shoppingbag.component.html',
  providers: [UserService]
})
export class ShoppingbagComponent implements OnInit {
  bagproduct: Bagproduct = new Bagproduct();   // изменяемый товар
    bagproducts: Bagproduct[];                // массив товаров
    tableMode: boolean = true;          // табличный режим

  constructor(private userService: UserService ,public homecomponent: HomeComponent) { }

  ngOnInit() {
    this.loadBagProducts();
  }
  loadBagProducts() {
    this.userService.getProductsFromShoppingBag(this.homecomponent.userDetails.id)
        .subscribe((data: Bagproduct[]) => this.bagproducts = data);
  }
  delete(p: Bagproduct) {
    this.userService.deleteShoppingBag(p.id)
        .subscribe(data => this.loadBagProducts());
  }
}
