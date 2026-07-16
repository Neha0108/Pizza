import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LOCAL_STORAGE } from '../app.config';

export const authGuard: CanActivateFn = () => {
  const localStorage = inject(LOCAL_STORAGE);
  const router = inject(Router);
  const user = localStorage?.getItem('user');
  if (user) return true;
  return router.parseUrl('/login');
};

export const noAuthGuard: CanActivateFn = () => {
  const localStorage = inject(LOCAL_STORAGE);
  const router = inject(Router);
  const user = localStorage?.getItem('user');
  if (user) return router.parseUrl('/');
  return true;
};
