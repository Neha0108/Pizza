import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LOCAL_STORAGE } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class Pizza {

  private url = "http://localhost:3001/pizza";
  private api = inject(HttpClient);

  private localStorage = inject(LOCAL_STORAGE);
  private ldata:any = this.localStorage?.getItem('myCart');

  private cartSubject = new BehaviorSubject<any[]>(this.localStorage?.getItem('myCart')!=undefined?JSON.parse(this.ldata):[]);

  CartSubject = this.cartSubject.asObservable();
  
  getPizza():Observable<Pizza>
  {
    return this.api.get<Pizza>(this.url);
  }

  addCartSubject(data:any)
  {
    this.cartSubject.next(data);
  }
}
