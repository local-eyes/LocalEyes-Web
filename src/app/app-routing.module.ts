import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectLinkComponent } from './components/direct-link/direct-link.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ForYouComponent } from './components/for-you/for-you.component';
import { HomeComponent } from './components/home/home.component';
import { NewComponent } from './components/new/new.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GuardGuard } from './services/guard/guard.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'profile/:uid', component: ProfileComponent},
  {path: 'post/:collection/:id', component: DirectLinkComponent},
  {path: 'notifications', component: ExploreComponent},
  {path: 'create', component: NewComponent, canActivate: [GuardGuard]},
  {path: 'unanswered', component: ForYouComponent},
  {path: 'profile/:uid/edit', component: EditProfileComponent, canActivate: [GuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
