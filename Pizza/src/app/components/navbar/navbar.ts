import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LOCAL_STORAGE } from '../../app.config';
import { Pizza } from '../../service/pizza';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {

  private localStorage = inject(LOCAL_STORAGE);

  private router = inject(Router);

  private pservice = inject(Pizza);

  count:any = 0;

  isLoggedIn(): boolean {
    return !! this.localStorage?.getItem('user');
  }

  logout(){
    this.localStorage?.removeItem('user');
    this.router.navigateByUrl('');

  }

  ngOnInit():void{
    this.pservice.CartSubject.subscribe({
      next:(data:any) => {
        this.count = data.length;
      },
      error: (err) =>
      {
        console.log(err);
      }
    })
  }
}
