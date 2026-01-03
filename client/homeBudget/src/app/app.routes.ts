import { Routes } from '@angular/router';
import { MainView } from './main-view/main-view';
import { LimitsView } from './limits-view/limits-view';
import { CategoriesView } from './categories-view/categories-view';

export const routes: Routes = [
    {
        path: '',
        component: MainView,
        children: [
            {
                path: 'limits',
                component: LimitsView
            },
            {
                path: 'categories',
                component: CategoriesView
            }
        ]
    },

];
