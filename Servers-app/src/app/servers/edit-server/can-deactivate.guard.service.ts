import { Observable } from "rxjs/Observable";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from "@angular/router";


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* A GUARD ALWAYS NEED TO BE a service !!!!
* route Guard functionalities/interfaces-implemented-logic are executed before angular loads the route or leave a route
* for that to happen you need a service Auth Guard (CanDesactivateGuardService) that implements interface such as canActivate,canActivateChild, canDesactivate,...
* note that canDesactivate implemented by Auth Guard service can also wrap an interface (e.g CanComponentDeactivate), which will be 
* implemented by the component and its logic inside the component could be called from inside by that Auth Guard service (CanDesactivateGuardService).  
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    
//custom interface implemented by the component and wrapped by the Guard interface CanDeactivate
export interface CanComponentDeactivate{
    canDeactivate: () =>  Observable<boolean> | Promise<boolean> | boolean 
}



export class CanDesactivateGuardService implements CanDeactivate<CanComponentDeactivate>{

    //called by angular router when we try to leave a route
    //angular execute CanDeactivate in the CanDesactivateGuardService, which call and executes  
    //canDeactivate() on the component where we are currently on...
    /*
                export interface CanDeactivate<T> {
                    canDeactivate(component: T, currentRoute: ActivatedRouteSnapshot, 
                        currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot)
                        : Observable<boolean> | Promise<boolean> | boolean;
                }
    */
    canDeactivate(component: CanComponentDeactivate, 
                    currentRoute:ActivatedRouteSnapshot,
                    currentState:RouterStateSnapshot,
                    nextState?: RouterStateSnapshot) //optional: where to go next 
                                                    : Observable<boolean> | Promise<boolean> | boolean {

        //we call canDeactivate on the component where we are currently on. 
        //need to be implemented in the component.              
        return component.canDeactivate();
    }
}