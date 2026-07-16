import { Component, inject, OnInit } from '@angular/core';
import { Pizza } from '../../service/pizza';
import { LOCAL_STORAGE } from '../../app.config';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class Checkout implements OnInit {
  private pservice = inject(Pizza);
  private localStorage = inject(LOCAL_STORAGE);
  private router = inject(Router);

  cart: any[] = [];
  name = '';
  address = '';

  ngOnInit(){
    const ld = this.localStorage?.getItem('myCart');
    if(ld){
      this.cart = JSON.parse(ld);
    }
    this.pservice.CartSubject.subscribe({
      next: function(data: any){ },
      error: function(err:any){ console.log(err); }
    });
  }

  getTotal(){
    return this.cart.reduce(function(s, it){ return s + (it.price * (it.pquantity || 1)); }, 0);
  }

  confirmOrder(){
    if(!this.name || !this.address){
      alert('Please provide name and address');
      return;
    }

    const order = {
      id: 'ORD-' + Date.now(),
      name: this.name,
      address: this.address,
      items: this.cart,
      total: this.getTotal(),
      createdAt: new Date().toISOString()
    };

    const ordersRaw = this.localStorage?.getItem('orders');
    const orders = ordersRaw ? JSON.parse(ordersRaw) : [];
    orders.push(order);
    this.localStorage?.setItem('orders', JSON.stringify(orders));

    this.cart = [];
    this.localStorage?.removeItem('myCart');
    this.pservice.addCartSubject(this.cart);

    alert('Order placed successfully — ' + order.id);
    this.router.navigateByUrl('/');
  }
}
