import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthFakeService } from "app/auth-fake-service";


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* A GUARD ALWAYS NEED TO BE a service !!!!
* route Guard functionalities/interfaces-implemented-logic are executed before angular loads the route or leave a route
* for that to happen you need a service Auth Guard that implements interface such as canActivate,canActivateChild, canDesactivate,...
* note that canDesactivate implemented by Auth Guard service can also wrap an interface, which will be implemented by the component and 
* its logic inside the component could be called from inside that by Auth Guard service.  
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    
//this needed because AuthGuardService inject AuthFakeService
@Injectable()
////FakeService is used to create a simple logging/logout scenario !
export class AuthGuardService implements CanActivate, CanActivateChild{
    constructor(private fakeServive:AuthFakeService, private route:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean  {
        return this.fakeServive.isAuthenticated()
                        .then(
                            (authenticated:boolean) =>{
                                if (authenticated) {
                                    return true;                                    
                                } else {
                                    this.route.navigate(['/']);                    
                                }
                            });
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute,state);
    }
    
}
