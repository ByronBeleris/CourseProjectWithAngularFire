import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  show = false;
  user: any;
  

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  toggleCollapse() {
    this.show = !this.show
  }

  onAddToShoppingList() {
    this.user = this.authService.getUserName();
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

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
