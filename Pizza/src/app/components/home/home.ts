import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LOCAL_STORAGE } from '../../app.config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  private localStorage = inject(LOCAL_STORAGE);

  isLoggedIn(): boolean {
    return !!this.localStorage?.getItem('user');
  }

  get username(): string {
    const raw = this.localStorage?.getItem('user');
    if (!raw) return '';
    try {
      const u = JSON.parse(raw);
      return u.name || u.email || '';
    } catch {
      return '';
    }
  }
}
