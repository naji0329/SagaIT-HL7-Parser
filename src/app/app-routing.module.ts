import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidebarTestComponent } from './components/sidebar-test/sidebar-test.component';
import { AuthGuard } from './guard/auth.guard';
// import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: '', redirectTo: 'tool', pathMatch: 'full' },
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
    path: 'tool',
    component: SidebarTestComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
