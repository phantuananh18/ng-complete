import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  selectedRecipe: Recipe;

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    })
  }
}
