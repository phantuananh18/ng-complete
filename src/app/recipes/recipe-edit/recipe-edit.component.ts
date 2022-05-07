import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImg = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        let formArr: FormArray;
        recipe.ingredients.forEach(ingredient => {
          recipeIngredients.push(this.formBuilder.group({
            name: [ingredient.name, [Validators.required]],
            amount: [ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ]]
          }))
        })
      }
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, [Validators.required]],
      imagePath: [recipeImg, [Validators.required]],
      description: [recipeDescription, [Validators.required]],
      ingredients: recipeIngredients
    })
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    this.controls.push(
      this.formBuilder.group({
        name: ['', [Validators.required]],
        amount: ['', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]]
      })
    )
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  onCancel() {
    this.router.navigateByUrl('/recipes');
  }

  getConfig(ctrl: string) {
    return this.recipeForm.get(ctrl)?.invalid && this.recipeForm.get(ctrl)?.touched
  }
}
