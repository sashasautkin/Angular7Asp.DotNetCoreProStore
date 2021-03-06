import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from "@angular/forms"; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ItemComponent } from './user/item/item.component';
import { CreateitemComponent } from './user/createitem/createitem.component';
import { ShoppingbagComponent } from './user/shoppingbag/shoppingbag.component';
import { YouritemComponent } from './user/youritem/youritem.component';
import {globals} from './shared/globals'

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ItemComponent,
    CreateitemComponent,
    ShoppingbagComponent,
    YouritemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar:true
    }),
    FormsModule
  ],
  providers: [UserService,HomeComponent,{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true  
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
