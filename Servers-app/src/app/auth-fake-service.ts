import { setTimeout } from "timers";

//FakeService to create a logging/logout scenario 
export class AuthFakeService{
    private loggedIn:boolean = false;

    isAuthenticated(){
        //a promise represents a completion of an async opearation: 
        //here a simple login set to true
        const promise = new Promise(
            (resolve,reject) =>{
                setTimeout(()=>{
                  resolve(this.loggedIn);  
                },800);
            });
        return promise;
    }

    login(){
        this.loggedIn=true;
    }

    logout(){
        this.loggedIn=false;
    }

}