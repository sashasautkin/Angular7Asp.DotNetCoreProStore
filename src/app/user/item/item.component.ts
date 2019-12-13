import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.userService.getProducts()
        .subscribe((data: Product[]) => this.products = data);
}

}
