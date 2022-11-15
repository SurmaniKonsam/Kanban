import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { LoginUser } from '../model/login-user.model';
import { User } from '../model/user.model';
import { BackendserviceService } from '../services/backendservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private backserv:BackendserviceService,private route:Router,public dialog:MatDialog) { }
  users:Array<LoginUser>=[]
  ngOnInit(): void {
    this.backserv.loginuser().subscribe(data=>{
      this.users=data;
      console.log(this.users);
    })
  }
  regForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]+$")]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(8),Validators.pattern("^(?=.*[0-9])(?=.*[a-z]).{8,20}")]),
    confirm:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(8),Validators.pattern("^(?=.*[0-9])(?=.*[a-z]).{8,20}")]),
    phone:new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern("[1-9][0-9]{9}")])
    });
    user:User=new User;
  register(){
    let user=this.users.filter(r=>r.userEmail==this.regForm.value.email)
    if(this.regForm.value.email?.length==0 || this.regForm.value.password?.length==0 || this.regForm.value.name?.length==0 || this.regForm.value.phone?.length==0 || this.regForm.value.confirm?.length==0 )
    {
      this.dialog.open(InfoDialogComponent,{data:{card:"Please Fill up the details",flag:false,flag2:false}});
    }
    else if(this.regForm.controls.email.hasError('email')||
    this.regForm.controls.password.hasError('pattern')||
    this.regForm.controls.phone.hasError('pattern')||
    this.regForm.controls.name.hasError('pattern')){
      this.dialog.open(InfoDialogComponent,{data:{card:"Credentials not valid",flag:false,flag2:false}});
    }
    else if(user.length>0){
      this.dialog.open(InfoDialogComponent,{data:{card:"User already exists",flag:false,flag2:false}});
    }
    else{
      this.user.email=this.regForm.value.email;
      this.user.password=this.regForm.value.password;
      this.user.name=this.regForm.value.name;
      this.user.phoneNumber=this.regForm.value.phone;
      this.user.taskList=[];
      this.backserv.registeruUser(this.user).subscribe(data=>{
        console.log(data);
        this.dialog.open(InfoDialogComponent,{data:{card:"User registered successfully",flag:false,flag2:true}})
      });
      let user = {
        name: this.regForm.value.name,
        email: this.regForm.value.email
      }
      this.backserv.sendEmail("http://localhost:3000/sendmail", user).subscribe(
        data => {
          let res:any = data; 
          console.log(
            `${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
          );
        },
        err => {
          console.log(err);
          
        },() => {
          
        }
      );
    }
}
nav(){
  this.route.navigate(["login"]);
}
nav2(){
  this.route.navigate(["about"]);
}
nav3(){
  this.route.navigate(["contact"]);
}
nav4(){
  this.route.navigate([""]);
}
}
