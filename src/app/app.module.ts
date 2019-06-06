import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing.module';
import { JwtHttpInterceptor } from './seguranca/jwt-http-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCMTy1BCLcCwdoVe_RZcwuer8HVNuvOnOk' }),
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,

    CoreModule,
    SegurancaModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true },
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
