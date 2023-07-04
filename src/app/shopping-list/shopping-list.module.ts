import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppinglistRoutingModule } from './shoppinglist-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    ShoppinglistRoutingModule,
    FormsModule,
    SharedModule,
    // RouterModule.forChild([
    //   { path: 'shopping-list', component: ShoppingListComponent },
    // ]),      //We can do like this if there is only one route, instead of creating a seperate routing.module.ts file
  ],
})
export class ShoppingListModule {}
