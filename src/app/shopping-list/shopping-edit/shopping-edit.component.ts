import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;
  constructor(private shoppinglistService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppinglistService.startedEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppinglistService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    const formValues = form.value;
    const newIngredient = new Ingredient(formValues.name, formValues.amount);
    if (this.editMode) {
      this.shoppinglistService.updateIngredient(
        this.editItemIndex,
        newIngredient
      );
    } else {
      this.shoppinglistService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClearItem() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
  onDeleteItem() {
    this.shoppinglistService.deleteIngredient(this.editItemIndex);
    this.onClearItem();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
