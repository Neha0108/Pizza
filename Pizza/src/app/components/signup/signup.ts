import { Component, inject } from '@angular/core';
import { Users } from '../../service/users';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  private uservice = inject(Users);
  
  private router = inject(Router);

  userForm = new FormGroup(
    {
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
    }
  )

  addData() {
    const formData: any = this.userForm.value;
    console.log(formData);
      this.uservice.addUser(formData).subscribe(
        {
          next: (data: any) => {
            alert("User Added successfully");
            console.log(data);
            this.router.navigateByUrl('/');
          },
          error: (error: any) => {
            console.log(error);
          }
        }
      )
    }
}
