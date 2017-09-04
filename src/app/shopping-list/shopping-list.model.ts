import { Ingredient } from '../shared/ingredient.model';

export class ShoppingList {
  public author: string;
  public ingredients: Ingredient[];

  constructor(author: string, ingredients: Ingredient[]) {

    this.author = author;
    this.ingredients = ingredients;

  }
}
