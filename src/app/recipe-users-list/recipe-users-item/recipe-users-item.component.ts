import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { RecipeService } from '../../recipes/recipe.service';
import { Recipe } from '../../recipes/recipe.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-users-item',
  templateUrl: './recipe-users-item.component.html',
  styleUrls: ['./recipe-users-item.component.css']
})
export class RecipeUsersItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  show = false;
  user: any;

  constructor(private recipeService: RecipeService,
              private authService: AuthService,
              private dataStorageService: DataStorageService){}
  
  ngOnInit() {
    console.log(this.recipe);
    console.log(this.index);
    this.user = this.authService.getUserName();

  }
  toggleCollapse() {
    this.show = !this.show;
  }
  onAddToShoppingList() {
    this.recipe.ingredients.forEach((item, index) => {
      item.author = this.user;
    });
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.dataStorageService.storeShoppingList()
    .subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
  hideTog() {
    this.show = false;
  }
  
}

// <div
// style="cursor: pointer;"
// [routerLink]="[index]"
// routerLinkActive="active"
// class="clearfix">
// <div class="float-left rStyle">
//   <h4>{{ recipe.name }}</h4>
//   <p>{{ recipe.description }}</p>
// </div>
// <span class="float-right">
//       <img
//         [src]="recipe.imagePath"
//         alt="{{ recipe.name }}"
//         class="img-responsive">
//     </span>
//   </div> 