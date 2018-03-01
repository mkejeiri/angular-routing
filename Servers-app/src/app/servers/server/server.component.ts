import { Component, OnInit,Input } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { Data } from '@angular/router/src/config';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  @Input() server: {id: number, name: string, status: string};

   
  constructor( private route:ActivatedRoute, private router:Router) { }

  /**
   * A resolver will always render the component but it will do some preloading before (e.g. fetching the data in the backend!)
   * A resolver will be rendered before the router is rendered, unlike auth guard 
   * a resolver cannot decide if the page is rendered or not.
   * a resolver will allow us to get some dynamic data from the backend:
   * in our case we use a fake back end : ServerResolverService which will inject ServersService 
   * which enables us to get an individual server and load it async (subscribe <-> observables) into the ServerComponent.
   *  this.route.data.subscribe().
   * 
   * The alternative technique: 
   *                        is to render a component and do some data fetching later like we did before in ngOnInit()
   */
  ngOnInit() {
    this.route.data
          .subscribe( //listen to any data changes using observables => 
                      //server could change while we are in the servers pages since we use a side menu!!!
            (data:Data) =>{
      this.server=data['myServer']; //{myServer: ServerResolverService}  
    })
    
    /**
     * Old technique: get the component first and fetch the data afterward
     */
    // constructor(private serversService: ServersService, private route:ActivatedRoute, private router:Router) { }
    // ngOnInit() {
    // if (this.route.snapshot.params['id'] !== undefined) {     
    //   this.route.params.subscribe((params: Params)=>{
    //     const id:number = +params['id'];
    //     this.server = this.serversService.getServer(id); 
    //   })
    // }

    // }
   

    
  }

  onEdit(){
    //BETTER APPROACH: becaue the current route ({relativeTo: this.route}) is already '/servers/id'
    //'preserve' : keep the values and overwrite any new one, if we have a new one we need to use 'merge' instead!!!
    this.router.navigate(['edit'],{relativeTo: this.route, queryParamsHandling:'preserve'});

    //we need only to add 'edit" to it.
    // this.router.navigate(['../',this.server.id,'edit'],{relativeTo: this.route});  
  }
}
