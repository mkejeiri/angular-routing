import { Component, OnInit, OnDestroy } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CanComponentDeactivate } from 'app/servers/edit-server/can-deactivate.guard.service';
@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})

export class EditServerComponent implements OnInit,OnDestroy, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  changeSaved:boolean = false;

  //THIS NOT NEEDED SINCE IT'S NOT A CUSTOM OBSERVABLE, Angular will unsubscribe for us : Just a reminder!!!!
  //used to keep a ref to the observable, in other to unsubscribe before 
  //the component get destroyed
  private paramSubscrib:Subscription;
  private fragmentSubscrib:Subscription;
  private queryParamsSubscrib:Subscription;
  allowEdit:boolean = false;
  constructor(private serversService: ServersService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {

    if (this.route.snapshot.params['id'] !== undefined) {    
      //same PB as when the component call itself, angular does not create a new component
    //we need to use observables and subscribe
    this.paramSubscrib = this.route.params.subscribe((params:Params) => {
      const id:number = +params['id'];
      this.server = this.serversService.getServer(id);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status; 
    
    });    
    //same PB as when the component call itself, angular does not create a new component
    //we need to use observables and subscribe
    this.queryParamsSubscrib = this.route.queryParams.subscribe((queryParams:Params)=>{
      /*console.log(e);*/    
      this.allowEdit = queryParams['allowEdit'] ==='1' ? true:false;
    });
    this.fragmentSubscrib = this.route.fragment.subscribe((e)=>{/*console.log(e);*/});
    }else{
      this.server = this.serversService.getServer(1);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status; 
    }
   
  }
  ngOnDestroy(){
    if (this.fragmentSubscrib !== undefined){
      this.fragmentSubscrib.unsubscribe();        
    }
    if (this.paramSubscrib !== undefined){
      this.paramSubscrib.unsubscribe();      
    }
    if (this.queryParamsSubscrib !== undefined){
      this.queryParamsSubscrib.unsubscribe();      
    }
  }

  onUpdateServer() {
    this.changeSaved = true; 
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});   

    //Navigate away...
    this.router.navigate(['../'],{relativeTo:this.route});
  }



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* A GUARD ALWAYS NEED TO BE a service !!!! which access to the injected component through the CanDesactivate.canDesactivate (also wrap an
* interface (e.g CanComponentDeactivate))
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* route Guard functionalities/interfaces-implemented-logic are executed before angular loads the route or leave a route
* for that to happen you need a service Auth Guard (CanDesactivateGuardService) that implements interface such as canActivate,canActivateChild,  * canDesactivate,...
* note that canDesactivate implemented by Auth Guard service can also wrap an interface (e.g CanComponentDeactivate), which will be 
* implemented by the component and its logic inside the component could be called from inside by that Auth Guard service 
* (CanDesactivateGuardService).  
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    
  // canDeactivate: () =>  Observable<boolean> | Promise<boolean> | boolean 
  canDeactivate(){
    if (!this.allowEdit) {
      return true;
    } else {      
      if((this.serverName !== this.server.name || this.serverStatus !==this.server.status) && !this.changeSaved){
        return confirm('All changes will be discarded!, are you sure to leave this page?');
      } else {
        return true;
      }
    }    
  }
}
