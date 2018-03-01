import { NgModule } from "@angular/core";
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
import { AuthGuardService } from "app/auth-guard.service";
import { CanDesactivateGuardService } from "app/servers/edit-server/can-deactivate.guard.service";
import { ErrorPageComponent } from "app/error-page/error-page.component";
import { ServerResolverService } from "app/servers/server/server-resolver.service";
const appRoutes:Routes = [
  {path:'', component: HomeComponent},
  {path:'users', component: UsersComponent, children:[
    {path:':id/:name', component:UserComponent}
  ]},
  {path:'servers',

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* A GUARD ALWAYS NEED TO BE a service !!!!
* route Guard functionalities/interfaces-implemented-logic are executed before angular loads the route or leave a route
* for that to happen you need a service Auth Guard that implements interface such as canActivate,canActivateChild, canDesactivate,...
* note that canDesactivate implemented by Auth Guard service can also wrap an interface, which will be implemented by the component and 
* its logic inside the component could be called from inside that by Auth Guard service.  
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
     
  //canActivate:[AuthGuard],
      canActivateChild:[AuthGuardService],    
      component:ServersComponent, children:[

        //for the resolve we use diff approach (not [] but a JS object that we will get into the ServerComponent through a route)
        //resolve:{myServer: ServerResolverService} : we could also use a diff prop in JS Object other than 'myServer' but remember 
        //to use it inside ServerComponent when we get it through router (avoid typo!!!). 
        //when the router is loaded the resolve methods is called and the resolver map the data in {myServer: ServerResolverService} 
        //and data will be stored in myServer property!. through route this data will be availabe in the component..
      {path:':id', component:ServerComponent,resolve:{myServer: ServerResolverService}},//passing dynamic data to the component,
                                                                                        //through ActivatedRoute   

      //Angular will run canDeactivate on CanDesactivateGuardService whenever we leave the EditServerComponent.
      {path:':id/edit', component:EditServerComponent,canDeactivate:[CanDesactivateGuardService]}
  ]},
  // {path:'not-found', component: PageNotFoundComponent},
  {path:'not-found', component: ErrorPageComponent,data:{message:'Page not found!'}}, //passing static data to the component,
                                                                                      //through ActivatedRoute
  {path:'**', redirectTo:'/not-found'} 
  //{path:'users/:id/:name', component:UserComponent}, //':' tells Angular it's a dynamic part of the path
  // {path:'servers/:id/edit', component:EditServerComponent},
  // {path:'servers/:id', component:ServerComponent}
 
];
@NgModule({
    // declarations: [],
      imports: [
         ///registering our routes..  
         RouterModule.forRoot(appRoutes)   

         //Webhosting case!!!!
        // RouterModule.forRoot(appRoutes,
        //    {useHash:true} //this will tell the webserver to ignore what come after the www.hostingserver.com/
        //                   //because angular will takeover from there (angular will add a hash '#' sign to separate url in 2 parts)
                             //http://localhost:4200/#/servers 

        //   )     
      ],
      exports:[
        RouterModule //we need to export the routing outside (to appModule)
      ],
    //   providers: [],
    //   bootstrap: []
})
export class AppRoutingModule{}