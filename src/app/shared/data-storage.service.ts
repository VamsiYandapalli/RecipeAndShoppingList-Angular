import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipeandshoppinglist-angular-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((responseData) => {
        console.log('Recipes Uploaded');
        console.log(responseData);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipeandshoppinglist-angular-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          console.log('Recipes fetched.');
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
