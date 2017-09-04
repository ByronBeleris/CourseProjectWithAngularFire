import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public author: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(author: string, name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {

    this.author = author;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
