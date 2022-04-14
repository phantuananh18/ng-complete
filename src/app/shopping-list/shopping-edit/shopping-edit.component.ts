import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit {

  constructor() { }

  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @Output() onClear = new EventEmitter<void>();
  @Output() ingredientDeleted = new EventEmitter<Ingredient>();

  ingredient: Ingredient;

  ngOnInit(): void {
  }

  onAddItem() {
    const ingredientName = this.nameInput.nativeElement.value;
    const ingredientAmount = this.amountInput.nativeElement.value;
    this.ingredient = new Ingredient(ingredientName, ingredientAmount);
    this.ingredientAdded.emit(this.ingredient);

  }
  onDeletedItem() {
    const ingredientName = this.nameInput.nativeElement.value;
    const ingredientAmount = this.amountInput.nativeElement.value;
    this.ingredient = new Ingredient(ingredientName, ingredientAmount);
    this.ingredientDeleted.emit(this.ingredient);
  }
}
