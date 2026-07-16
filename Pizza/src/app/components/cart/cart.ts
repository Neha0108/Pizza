import { Component, inject, OnInit } from '@angular/core';
import { Pizza } from '../../service/pizza';
import { LOCAL_STORAGE } from '../../app.config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  private pservice = inject(Pizza);
  private localStorage = inject(LOCAL_STORAGE);

  cart: any[] = [];

  ngOnInit(){
    this.pservice.CartSubject.subscribe({
      next: (data: any) => {
        this.cart = data || [];
      },
      error: (err:any) => console.log(err)
    });
    
    const ld = this.localStorage?.getItem('myCart');
    if (ld && this.cart.length === 0) {
      this.cart = JSON.parse(ld);
      this.pservice.addCartSubject(this.cart);
    }
  }

  increase(item: any){
    item.pquantity = (item.pquantity || 1) + 1;
    this.updateCart();
  }

  decrease(item: any){
    if((item.pquantity || 1) > 1){
      item.pquantity -= 1;
      this.updateCart();
    } else {
      this.remove(item);
    }
  }

  remove(item: any){
    this.cart = this.cart.filter(i => i.id !== item.id);
    this.updateCart();
  }

  updateCart(){
    this.localStorage?.setItem('myCart', JSON.stringify(this.cart));
    this.pservice.addCartSubject(this.cart);
  }

  getTotal(){
    return this.cart.reduce((s, it) => s + (it.price * (it.pquantity || 1)), 0);
  }

  checkout(){
    alert('Proceeding to check out');
    this.cart = [];
    this.updateCart();
  }
}