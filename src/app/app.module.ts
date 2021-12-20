import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './shared/header/header.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { TreeViewComponent } from './components/homepage/tree-view/tree-view.component';
import { EditorComponent } from './components/homepage/editor/editor.component';
import { CompareComponent } from './components/homepage/compare/compare.component';
import { VerticalGroupButtonsComponent } from './shared/vertical-group-buttons/vertical-group-buttons.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    ImprintComponent,
    TreeViewComponent,
    EditorComponent,
    CompareComponent,
    VerticalGroupButtonsComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
