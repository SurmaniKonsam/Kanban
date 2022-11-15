import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { TaskList } from '../model/task-list.model';
import { User } from '../model/user.model';
import { BackendserviceService } from '../services/backendservice.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';  
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  constructor(private backserv:BackendserviceService,@Inject(MAT_DIALOG_DATA)public data:any|null,public dialog:MatDialog) { 
    console.log(data);
    this.project1=data.project;
    this.fruits=data.project.listOfUsers;
  }
  project1:TaskList | undefined|null;
  currentuser=new User;
  ngOnInit(): void {
    this.backserv.getLoggedInUser().subscribe(data=>{
      this.currentuser=data;
      console.log(this.currentuser)
    });
    
  }
  newprojectform= new FormGroup({
    projectName:new FormControl('',Validators.required),
    date:new FormControl('',Validators.required),
    priority:new FormControl('',Validators.required),
    projectmembers:new FormControl('',Validators.required)
  });
  newtasklist= new TaskList;
  add(){
    if(this.currentuser.taskList.filter(r=>r.taskListName==this.newprojectform.value.projectName).length>0){
        this.dialog.open(InfoDialogComponent,{width:"600px",height:"200px", data:{card:
          "Project with name already exists.Please try with a different name, or for project requiring same name try numbering."
        ,flag:false,flag2:false}});
    }else{
    this.newtasklist.taskListName=this.newprojectform.value.projectName;
    this.newtasklist.date=this.newprojectform.value.date;
    this.newtasklist.projectPriority=this.newprojectform.value.priority;
    this.newtasklist.category=[];
    this.newtasklist.listOfTasksInProject=[];
    this.newtasklist.listOfUsers=[];
    this.currentuser.taskList.push({
      taskListName: this.newprojectform.value.projectName,
      category: ["TODO","IN-PROGRESS","VALIDATE","COMPLETE"],
      date: this.newprojectform.value.date,
      listOfTasksInProject: [],
      projectPriority: this.newprojectform.value.priority,
      listOfUsers: this.fruits
    });
    console.log(this.currentuser);
    let response=this.backserv.updateUser(this.currentuser);
    response.subscribe((data)=>console.log(data));
    this.backserv.loggedUser1=this.currentuser;
    //alert("added project successfully");
    this.dialog.open(InfoDialogComponent,{width:"500px",height:"135px",data:{card:"Project added successfully!",flag:false,flag2:true}});
  }
  }
  tempcurrentuser:User=new User;
  //date1:String|null|undefined;
  //names:Array<String>|undefined=[];

  
  update(){
    // console.log(this.newprojectform.value.projectmembers?.split(','));
    // this.date1=this.newprojectform.value.projectmembers;
    // this.names=this.date1?.split(",");
    // console.log(this.names);
    this.tempcurrentuser=this.currentuser;
    this.tempcurrentuser.taskList=this.backserv.loggedUser1.taskList.filter(r=>r.taskListName!=this.data.project.taskListName);
    this.newtasklist.taskListName=this.newprojectform.value.projectName;
    this.newtasklist.date=this.newprojectform.value.date;
    this.newtasklist.projectPriority=this.newprojectform.value.priority;
    this.tempcurrentuser.taskList.push({
      taskListName: this.newprojectform.value.projectName,
      category: ["TODO","IN-PROGRESS","VALIDATE","COMPLETE"],
      date: this.newprojectform.value.date,
      listOfTasksInProject: this.backserv.loggedUser1.taskList.filter(r=>r.taskListName==this.data.project.taskListName)[0].listOfTasksInProject,
      projectPriority: this.newprojectform.value.priority,
      listOfUsers: this.fruits
    });
    this.currentuser=this.tempcurrentuser;
    let response=this.backserv.updateUser(this.currentuser);
    response.subscribe((data)=>console.log(data));
    this.backserv.loggedUser1=this.currentuser;
    this.backserv.currentproject=this.backserv.loggedUser1.taskList.filter(r=>r.taskListName==this.newtasklist.taskListName)[0].taskListName;
  }
  addOnBlur = true;
  readonly separatorKeysCodes= [ENTER, COMMA] as const;
  fruits: String[] = [];
  add1(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.push(value);
    }
    event.chipInput!.clear();
  }
  remove(fruit: String): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}
