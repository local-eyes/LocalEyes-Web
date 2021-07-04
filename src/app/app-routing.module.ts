import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectLinkComponent } from './components/direct-link/direct-link.component';
import { ExploreComponent } from './components/explore/explore.component';
import { HomeComponent } from './components/home/home.component';
import { NewComponent } from './components/new/new.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardGuard } from './services/guard/guard.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile/:uid', component: ProfileComponent},
  {path: 'post/:collection/:id', component: DirectLinkComponent},
  {path: 'explore', component: ExploreComponent},
  {path: 'create', component: NewComponent, canActivate: [GuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
