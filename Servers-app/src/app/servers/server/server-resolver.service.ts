import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot  } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ServersService } from "app/servers/servers.service";
import { Injectable } from "@angular/core";

interface Server {
    id:number;
    name:string;
    status:string;

}

@Injectable()
export class ServerResolverService implements Resolve<Server>{
    constructor(private serversService:ServersService){}
    
    //unlike the component, this service will run each time before we render a route, the snpashot is only what we need. 
    //so no need to use observables
    //use a resolver whenever you have to render data async before rendering a route, 
    //each time the resolver will do the data loading async in advance before rendering the route...
    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
        //Simulation: fectching the data at the backend
        return this.serversService.getServer(+route.params['id']);        
    } 
}