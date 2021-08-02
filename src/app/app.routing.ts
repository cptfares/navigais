import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthguardGuard } from './authguard.guard';
import { EroorComponent } from './eroor/eroor.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AgentAuthComponent } from './agent-auth/agent-auth.component';

export const AppRoutes: Routes = [
  {path:'login', component: AuthComponent },
  {path:"agent-auth", component: AgentAuthComponent},


  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    
  }, {
    path: 'dashboard',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
   }], canActivate :[AuthguardGuard],canLoad:[AuthguardGuard], 


},
{path: '**',component: WelcomePageComponent },
  {path:'home', component: WelcomePageComponent }
  
]

