import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from "./task-list/task-list.component";
import { authGuard } from "./guard/auth.guard";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
