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
import { ProfileComponent } from './components/profile/profile.component';
import { CommonComponent } from './components/profile/common/common.component';
import { SegmentsComponent } from './components/profile/segments/segments.component';
import { FieldsComponent } from './components/profile/fields/fields.component';
import { DataTypesComponent } from './components/profile/data-types/data-types.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './components/settings/settings.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ResizableModule } from 'angular-resizable-element';
import { TreeSiewSectionComponent } from './components/homepage/tree-view/tree-view-section/tree-view-section.component';
import { NgxResizableModule } from '@3dgenomes/ngx-resizable';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DatePipe } from '@angular/common';

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
    ProfileComponent,
    CommonComponent,
    SegmentsComponent,
    FieldsComponent,
    DataTypesComponent,
    SettingsComponent,
    FooterComponent,
    TreeSiewSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ResizableModule,
    NgxResizableModule,
    PdfViewerModule,
    
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
