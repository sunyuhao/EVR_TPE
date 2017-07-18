// import core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule,JsonpModule  } from '@angular/http';

import { FormsModule } from '@angular/forms';


// import module  
import {RoutingModule} from './routing/routing.module'
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ScrollbarDirective } from './scrollbar.directive';
// import component
import { AppComponent } from './app.component';
import { LogoComponent } from './component/logo/logo.component';
import { FooterComponent } from './component/footer/footer.component';
import { AccueilComponent } from './component/accueil/accueil.component';
import { MetierComponent } from './component/metier/metier.component';

//import services
import { AccueilService } from './service/accueil.service';
import { MetierService } from './service/metier.service';
import { LoginComponent } from './component/login/login.component';






@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    FooterComponent,
    AccueilComponent,
    MetierComponent,
    ScrollbarDirective,
    LoginComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule
  ],
  providers: [AccueilService,MetierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
