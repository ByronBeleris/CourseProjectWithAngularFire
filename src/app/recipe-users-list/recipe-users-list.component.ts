import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-recipe-users-list',
  templateUrl: './recipe-users-list.component.html',
  styleUrls: ['./recipe-users-list.component.css']
})
export class RecipeUsersListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.dataStorageService.getRecipes();
    this.recipes = this.recipeService.getRecipes();
  

    }

  ngOnDestroy() {
    console.log(this.recipes);
  }
}
