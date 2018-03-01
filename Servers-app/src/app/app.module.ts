import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from 'app/app-routing-module';
import { AuthGuardService } from 'app/auth-guard.service';
import { AuthFakeService } from 'app/auth-fake-service';
import { CanDesactivateGuardService } from 'app/servers/edit-server/can-deactivate.guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolverService } from 'app/servers/server/server-resolver.service';

/********************************************** 
* Moved to app-routing-module.ts
**********************************************/
// const appRoutes:Routes = [
//   {path:'', component: HomeComponent},
//   {path:'users', component: UsersComponent, children:[
//     {path:':id/:name', component:UserComponent}
//   ]},
//   {path:'servers', component:ServersComponent, children:[
//     {path:':id', component:ServerComponent},
//     {path:':id/edit', component:EditServerComponent}   
//   ]},
//   {path:'not-found', component: PageNotFoundComponent},
//   {path:'**', redirectTo:'/not-found'}
 
//   //{path:'users/:id/:name', component:UserComponent}, //':' tells Angular it's a dynamic part of the path
//   // {path:'servers/:id/edit', component:EditServerComponent},
//   // {path:'servers/:id', component:ServerComponent}
 
// ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // RouterModule.forRoot(appRoutes) ///registering our routes..
    AppRoutingModule //We get outsourced AppRoutingModule, holding all the routing.
   
  ],
  providers: [ServersService, AuthGuardService, AuthFakeService,CanDesactivateGuardService,ServerResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
