import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router ,ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService
                  , private router:Router
                  , private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReloadServers(){
    /*(unlike routerLink) by default ''navigate' doesn't know on which route is currently on. 
    * we need to set an JS object with property 'relativeTo',{relativeTo: this.activatedRoute} 
    * this.activatedRoute should be automatically loaded, hence the use of DI.
    */
    this.router.navigate(['../servers'],{relativeTo: this.activatedRoute});
  }

}
 