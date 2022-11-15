import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from '../model/login-user.model';
import { NavcompComponent } from '../navcomp/navcomp.component';
import { BackendserviceService } from '../services/backendservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private backserv:BackendserviceService, private route:Router,private navbar:NavcompComponent) { }
  errmsg:String="";
  users:Array<LoginUser>=[];
  ngOnInit(): void {
    this.backserv.loginuser().subscribe(data=>{
      this.users=data;
      console.log(this.users);
    })
  }
  loginform= new FormGroup({
    mail:new FormControl('',[Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9_]+[@][a-z]+[.][a-z]+$")]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(15), Validators.pattern("^(?=.*[0-9])(?=.*[a-z]).{8,20}")])
  })
  userdetails: LoginUser = new LoginUser;
  login(){
    let existingusers=this.users.filter((r)=>(r.userEmail==this.loginform.value.mail)&&(r.password==this.loginform.value.password));
    if(existingusers.length>0){
      console.log("found");
      this.backserv.loggedIn=true;
      this.navbar.hide=true;
      console.log(this.navbar.hide);
      this.backserv.loggedinuser=existingusers[0].userEmail;
      console.log(this.backserv.loggedinuser);
      this.route.navigate(["home"]);
    }else{
      console.log("not found");
      this.errmsg="User Not Found"
    }
  }
  register(){
    this.route.navigate(["register"]);
  }

  nav1(){
    this.route.navigate(["register"]);
  }
 
  nav2()
  {
    this.route.navigate(['about']);
  }

  nav3()
  {
    this.route.navigate(['contact']);
  }
  nav4()
  {
    this.route.navigate([""]);
  }
}
