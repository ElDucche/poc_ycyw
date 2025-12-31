import { Routes } from '@angular/router';
import { Home } from './pages/home/home.component';
import { Support } from './pages/support/support.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'support', component: Support }
];
