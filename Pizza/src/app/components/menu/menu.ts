
import { Pizza } from '../../service/pizza';

import { LOCAL_STORAGE } from '../../app.config';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit{

  pizza:any;
  
  private pservice = inject(Pizza);

  private localStorage = inject(LOCAL_STORAGE);

  cartData:any;

  private changedetector = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadPizaa();
    this.changedetector.detectChanges();
  }
  loadPizaa()
  {
    this.pservice.getPizza().subscribe({
      next:(data:any) => {
        this.pizza = data;
        this.changedetector.detectChanges();
      },
      error: (err) =>
      {
        console.log(err);
      }
    })
  }
  addCart(cartData:any)
  {
    if(this.localStorage?.getItem("myCart") != undefined){
      let localData: any = this.localStorage?.getItem("myCart");
      let cart= JSON.parse(localData);
      let status = false;

      cart.forEach((piz: any, ind: number) => {
        if(piz.id == cartData.id){
          piz.pquantity +=1;
          status = true;
        }
      })
      if(status){
        this.localStorage?.setItem("myCart",JSON.stringify(cart));
        this.pservice.addCartSubject(cart);
        alert("Product Added to Cart successfully");
      }
      else{
        let data: any = { ...cartData, 'pquantity': 1 }
        cart.push(data);
        this.localStorage?.setItem("myCart", JSON.stringify(cart));
        this.pservice.addCartSubject(cart);
        alert("Product Add to cart successfully")
      }
    }
    else{
      let arr: any[] = [];
      let data: any = { ...cartData, 'pquantity': 1 }
      arr.push(data)
      this.localStorage?.setItem("myCart", JSON.stringify(arr));
      this.pservice.addCartSubject(arr);
      alert("Product Added to cart successfully")

    }
  }
}
