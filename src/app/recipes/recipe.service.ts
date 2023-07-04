import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  constructor(private shoppinglistService: ShoppingListService) {}
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    // new Recipe(
    //   'Buffalo Ribs',
    //   'Simmple and Tasty Buffalo ribs',
    //   'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
    //   [
    //     new Ingredient('Buffalo Ribs', 10),
    //     new Ingredient('Buffalo Sauce', 100),
    //     new Ingredient('Charcoal', 1),
    //   ]
    // ),
    // new Recipe(
    //   'Fried Prawns',
    //   'Delicious Fried Prawns',
    //   'https://c1.wallpaperflare.com/preview/772/904/903/korean-cuisine-food-shrimp-appetizer-thumbnail.jpg',
    //   [
    //     new Ingredient('Prawns', 20),
    //     new Ingredient('Oil', 1),
    //     new Ingredient('Pepper', 10),
    //   ]
    // ),
    // new Recipe(
    //   'Onion Pakoda',
    //   'Delicious Onion Pakoda',
    //   'https://www.kamalascorner.com/wp-content/uploads/2015/03/pakoda.jpg',
    //   [
    //     new Ingredient('Onions', 10),
    //     new Ingredient('Flour', 150),
    //     new Ingredient('Salt', 10),
    //   ]
    // ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  sendIngToShoppingList(ingredients: Ingredient[]) {
    console.log(ingredients);
    this.shoppinglistService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
