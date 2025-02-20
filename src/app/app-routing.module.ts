import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarTestComponent } from './components/sidebar-test/sidebar-test.component';
// import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'imprint',
    component: ImprintComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
  ,
  // {
  //   path: 'test',
  //   component: TestComponent
  // }
  // ,
  {
    path: 'app',
    component: SidebarTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
