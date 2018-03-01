import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFakeService } from 'app/auth-fake-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private authFakeService:AuthFakeService) { }

  ngOnInit() {
  }
  onLoadServers(id:number){
    //Some complex calculations
    //reaching out to backend and storing data
    //now we need a user redirection to navigate away
    this.router.navigate(['/servers',id,'edit'],{queryParams:{allowEdit:'1',mode:"editing",error:"NO_ERR"},fragment:'loading'});
  }

  onLogin(){
  this.authFakeService.login();
  }

  onLogout(){
    this.authFakeService.logout();
  }
}
