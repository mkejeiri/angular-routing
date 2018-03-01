import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit,OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  //ActivatedRoute: holds a JS meta-data including which current user is using the route var!
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //if we had to reload the same component within itself, angular doesn't know (for performance reason)that
    //it has to reload/create new component filled with new provided data on routerLink!
    //hence we need to use observables (async) to listen to data change.
    this.user = {
      id:this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    //using observable = data change listener
    //update the user whenever the params change
     this.paramsSubscription = this.route.params.subscribe((params:Params)=>{
      this.user.id = params['id'];
      this.user.name = params['name'];
    });    
  }

  //In general the subscription lives in memeory even when the component is destroyed.
  //for custom observables you need to unsubscribe when the component get destroy,
  // because we use a generic observable angular does it for us
  //Here it's optional
  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }
}
