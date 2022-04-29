import { EventEmitter, Injectable } from '@angular/core'
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
    providedIn: "root",
})
export class ShoppingListService {
    ingredientChanged = new EventEmitter<Ingredient[]>();
    startedEditing = new EventEmitter<number>();

    constructor() { }

    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomato', 10)
    ];

    getIngredients() {
        return this.ingredients; //bỏ slice() 
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients); //hiển thị bản coppy vào cây DOM
        this.ingredientChanged.emit(this.ingredients.slice()) //dùng event emitter
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.emit(this.ingredients.slice());
    }

    delteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.emit(this.ingredients.slice());
    }

}