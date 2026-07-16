import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Signup } from './components/signup/signup';
import { authGuard, noAuthGuard } from './guards/auth.guard';
import { Menu } from './components/menu/menu';
import { Cart } from './components/cart/cart';
import { Checkout } from './components/checkout/checkout';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'login', component: Login},
  { path: 'signUp', component: Signup },
  { path: 'menu', component:Menu, canActivate:[authGuard,noAuthGuard]},
  { path: 'cart', component:Cart, canActivate:[authGuard,noAuthGuard]},
  { path: 'checkout', component:Checkout, canActivate:[authGuard,noAuthGuard]}
];
