import { RecipesUsersListRoutingModule } from './recipe-users-list-routing.module';
import { RecipeUsersListComponent } from './recipe-users-list.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';
import { RecipeUsersItemComponent } from './recipe-users-item/recipe-users-item.component';

@NgModule({
  declarations: [
      RecipeUsersListComponent,
      RecipeUsersItemComponent
    
  ],
  imports: [
    CommonModule,
    RecipesUsersListRoutingModule,
    SharedModule
  ],
  
})
export class RecipeUsersListModule {}
