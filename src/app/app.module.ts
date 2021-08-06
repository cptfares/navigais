import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { AngularFireModule } from "@angular/fire";
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TablesComponent } from './tables/tables.component';
import { AuthComponent } from './auth/auth.component';
import { AuthguardGuard } from "./authguard.guard";
import { EroorComponent } from './eroor/eroor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from "@angular/fire/firestore";

import {MatDialogModule} from '@angular/material/dialog';
import { AgentAuthComponent } from './agent-auth/agent-auth.component';
import { DialogComponent } from './pages/table/dialog/dialog.component';
import { AddContainerComponent } from './pages/add-container/add-container.component';
import { SetupContainerComponent } from './pages/setup-container/setup-container.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    TablesComponent,
    AuthComponent,
    EroorComponent,
    WelcomePageComponent,
    AgentAuthComponent,
    DialogComponent,
    AddContainerComponent,
    SetupContainerComponent,
  

  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule ,

   
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    FixedPluginModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyD6vBx8V6CNqd7TgTXIsOMYw1st3PAKeU4",
      authDomain: "smartcontainer-bc371.firebaseapp.com",
      projectId: "smartcontainer-bc371",
      storageBucket: "smartcontainer-bc371.appspot.com",
      messagingSenderId: "1085978307087",
      appId: "1:1085978307087:web:45a761650109ead832d17a"
    })
  ],
  providers: [AuthguardGuard,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
