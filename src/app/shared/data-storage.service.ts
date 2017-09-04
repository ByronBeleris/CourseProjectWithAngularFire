import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { concat } from 'rxjs/observable/concat';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Response } from '@angular/http';
import 'rxjs/Rx';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService,
              private slService: ShoppingListService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put('https://course-project-38263.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    // return this.http.put('https://course-project-38263.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes(),{
    //   observe: 'body'
      // observe: 'events'  // for requests of events. look documentation
    // });

    // const req = new HttpRequest('PUT', 'https://course-project-38263.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   reportProgress: true,
    //   params: new HttpParams().set('auth', token)
    // });
    // return this.http.request(req);
  }

  getMyRecipes() {
    const UserRecipes: Recipe[] = [];
    const user = this.authService.getUserName();
    const token = this.authService.getToken();
    // const headers = new HttpHeaders().set('Authorization', 'Bearer adfgdsxdfcsd'):  
    //  this wont work with firebase because it makes its own headers
    
    this.http.get<Recipe[]>('https://course-project-38263.firebaseio.com/recipes.json?auth=' + token) // 1
    // this.http.get<Recipe[]>('https://course-project-38263.firebaseio.com/recipes.json', {  //2
      // observe: 'response',
      // observe: 'body',
      // responseType: 'text'  // default is json
      // headers: headers
      // params: new HttpParams().set('auth', token)
    // })
      .map(
        (recipes) => {
          for (let recipe of recipes) {       //  1
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          };
          recipes.forEach((item, index) => {
            if (user === item.author){
              UserRecipes.push(item);
            }
          });
          recipes.forEach((item, index) => {
            if (user !== item.author){
              UserRecipes.push(item);
            }
          });

          return UserRecipes;
          // console.log(recipes);  // 2
          // return [];             // 2
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
    
  }
  getRecipes() {   
    this.http.get<Recipe[]>('https://course-project-38263.firebaseio.com/recipes.json') 
      .map(
        (recipes) => {
          for (let recipe of recipes) {       //  1
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          };
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }


  storeShoppingList() {
    const token = this.authService.getToken();

    return this.http.put('https://course-project-38263.firebaseio.com/shopping-list.json?auth=' + token, this.slService.getIngredients());
  }
  getShoppingList() {
    const userIngredients: Ingredient[]= [];
    const user = this.authService.getUserName();
    const token = this.authService.getToken();
    this.http.get<Ingredient[]>('https://course-project-38263.firebaseio.com/shopping-list.json?', {
      observe: 'body',
      params: new HttpParams().set('auth', token)
    })
      .map(
        (ingredients) => {
          for (let ingredient of ingredients) {   
            if (!ingredient['author']) {
              ingredient['author'] = '';
            }
            if (!ingredient['name']) {
              ingredient['name'] = '';
            }
            if (!ingredient['name']) {
              ingredient['amount'] = 0;
            }
            
          }
            ingredients.forEach((item, index) => {
              if (user === item.author){
                userIngredients.push(item);
              }
            });
            ingredients.forEach((item, index) => {
              if (user !== item.author){
                userIngredients.push(item);
              }
            });
          
          return userIngredients;

        }
      )
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.slService.setIngredients(ingredients);
        }
      );
    }
  }

