import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ItemComponent } from './user/item/item.component';
import { CreateitemComponent } from './user/createitem/createitem.component';
import { ShoppingbagComponent } from './user/shoppingbag/shoppingbag.component';


const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
    {path: 'registration', component: RegistrationComponent },
    {path: 'login', component: LoginComponent }
    ]
  },
  {path:'home', component:HomeComponent , 
  children:[
  {path: 'item' , component: ItemComponent},
  {path: 'createitem' , component: CreateitemComponent},
  {path: 'shoppingbag' , component: ShoppingbagComponent}
], canActivate:[AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
