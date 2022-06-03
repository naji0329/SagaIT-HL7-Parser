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
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './components/settings/settings.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ResizableModule } from 'angular-resizable-element';
import { NgxResizableModule } from '@3dgenomes/ngx-resizable';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DatePipe } from '@angular/common';
import { TreeviewModule } from 'ngx-treeview';
import { SidebarTestComponent } from './components/sidebar-test/sidebar-test.component';
import { TextareaAutoresizeDirective } from './shared/sidebar/textarea-autoresize.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    ImprintComponent,
    TreeViewComponent,
    EditorComponent,
    CompareComponent,
    SidebarComponent,
    SettingsComponent,
    FooterComponent,
    SidebarTestComponent,
    TextareaAutoresizeDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ResizableModule,
    NgxResizableModule,
    PdfViewerModule,
    TreeviewModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
