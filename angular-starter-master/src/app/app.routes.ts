import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TableComponent} from './components/table/table.component';
import {NoneComponent} from './components/no-content/none.component';
import {MessageComponent} from "./message/message.component";
import {BrokerComponent} from "./broker/broker.component";

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'broker',
    component: BrokerComponent
  },
  {
    path: 'topics',
    component: TableComponent,
    children: [
      { path: '', component: NoneComponent, pathMatch: 'full'},
      { path: ':topic', component: MessageComponent }
    ]
  },
  { path: '**',    component: NoContentComponent },
];
