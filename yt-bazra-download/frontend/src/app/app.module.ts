import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { AntDesignModule } from './ant-design/ant-design.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './root/home/home.component';
import { RootComponent } from './root/root.component';
import { VideoCardComponent } from './root/home/video-card/video-card.component';



registerLocaleData(en);

@NgModule({
  declarations: [
        AppComponent,
        RootComponent,
        HomeComponent,
        VideoCardComponent
  ],
  imports: [
    BrowserModule,
      AppRoutingModule,
      AntDesignModule,
      FlexLayoutModule,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      HttpClientModule,
      BrowserAnimationsModule
  ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
