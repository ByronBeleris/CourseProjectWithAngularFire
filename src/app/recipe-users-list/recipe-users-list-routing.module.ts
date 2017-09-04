import { RecipeUsersListComponent } from './recipe-users-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';

const recipesUsersListRoutes: Routes = [
  { path: '', component: RecipeUsersListComponent, children: [
    // { path: ':id', component: RecipeUserListDetailComponent }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesUsersListRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class RecipesUsersListRoutingModule {}
