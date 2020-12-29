import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChannelServiceComponent } from './components/channel-service/channel-service.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'channel-detail/:id',
        component: ChannelServiceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  MainComponent,
  NavBarComponent,
  DashboardComponent,
  ChannelServiceComponent
]
