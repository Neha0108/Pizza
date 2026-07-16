import { Component, inject } from '@angular/core';
import { Users } from '../../service/users';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LOCAL_STORAGE } from '../../app.config';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private uservice = inject(Users);
  private router = inject(Router);
  private localStorage = inject(LOCAL_STORAGE);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    const uemail = this.loginForm.value.email;
    const upassword = this.loginForm.value.password;

    this.uservice.getUser(uemail as string,upassword as string).subscribe((res:any) =>{
      if(res.length>0){
        this.localStorage?.setItem('user',JSON.stringify(res[0]));
        this.router.navigateByUrl('menu');
      }
      else
      {
        alert("Invalid Credentials");
      }
    });
  }

}
