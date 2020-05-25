import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Error404Component } from './error-404/error-404.component';
import { CourseModule } from './courses/course.module';
import { core } from '@angular/compiler';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    CourseModule,
    RouterModule.forRoot([
      {
        // rota inicial para base path (vazio)
        path: '', redirectTo: 'courses', pathMatch: 'full'
      },
      {
        // quando não encontrar a url
        path: '**', component: Error404Component
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
