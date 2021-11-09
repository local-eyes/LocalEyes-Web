import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectLinkComponent } from './components/direct-link/direct-link.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ForYouComponent } from './components/for-you/for-you.component';
import { HomeComponent } from './components/home/home.component';
import { NewComponent } from './components/new/new.component';
import { NotOpenComponent } from './components/not-open/not-open.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CityGuard } from './services/city/city.guard';
import { GuardGuard } from './services/guard/guard.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [CityGuard]},
  {path: 'profile/:uid', component: ProfileComponent},
  {path: 'post/:collection/:id', component: DirectLinkComponent},
  {path: 'notifications', component: ExploreComponent, canActivate: [CityGuard]},
  {path: 'create', component: NewComponent, canActivate: [GuardGuard, CityGuard]},
  {path: 'unanswered', component: ForYouComponent, canActivate: [CityGuard]},
  {path: 'launching-soon', component: NotOpenComponent},
  {path: 'profile/:uid/edit', component: EditProfileComponent, canActivate: [GuardGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
