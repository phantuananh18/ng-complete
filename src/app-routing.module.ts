import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './app/recipes/recipes.component';
import { ShoppingListComponent } from './app/shopping-list/shopping-list.component';
import { RecipeStartComponent } from './app/recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './app/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './app/recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'recipes', component: RecipesComponent, children: [
            { path: '', component: RecipeStartComponent },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent }
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
