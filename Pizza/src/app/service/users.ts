import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LOCAL_STORAGE } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class Users {
  
  private url = "http://localhost:3000/users/";
  private http = inject(HttpClient);

  private localStorage = inject(LOCAL_STORAGE);
  
  addUser(data:any):Observable<User>
  {
    return this.http.post<User>(this.url,data);
  }

  getUser(email:string,password:string):Observable<User>
  {
    return this.http.get<User>(this.url+"?email="+email+"&password="+password);
  }
}
