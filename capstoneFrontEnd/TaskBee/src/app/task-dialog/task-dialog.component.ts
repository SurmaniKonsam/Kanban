import { Component, NgIterable, OnInit, Inject } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators, NgForm } from '@angular/forms';
import { AddProjectComponent } from '../add-project/add-project.component';
import { DashboardcompComponent } from '../dashboardcomp/dashboardcomp.component';
import { TaskCard } from '../model/task-card.model';
import { TaskList } from '../model/task-list.model';
import { User } from '../model/user.model';
import { BackendserviceService } from '../services/backendservice.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  constructor(private taskservice:BackendserviceService, private dash:DashboardcompComponent,
    @Inject(MAT_DIALOG_DATA)public data:any|null,public dialog:MatDialog) 
  {
  this.card=data.card;
 }
  user:User=new User;
  users:Array<String>|Array<User>|null|undefined|NgIterable<String>=[];
  users1:Array<TaskList>=[]
  users2:Array<any>=[];
  card:TaskCard;
  categories1:Array<String|null|undefined>=[];
  ngOnInit(): void {
    this.taskservice.getLoggedInUser().subscribe(data=>{
      this.user=data;
    });
    this.users1=this.taskservice.loggedUser1.taskList.filter(r=>r.taskListName==this.taskservice.currentproject);
    this.users2=this.users1[0].listOfUsers;
    this.taskservice.loggedUser1.taskList.filter(r=>r.taskListName==this.taskservice.currentproject)[0].category
    .filter(r=>{
      if(r!=""){
          this.categories1.push(r);
      }
    })
  }
  newtaskform=new FormGroup({
    taskName:new FormControl('',Validators.required),
    priority:new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
    assignee: new FormControl('',Validators.required)
  });
  currentProject:Array<TaskList>=[];
  add(){
    if(this.taskservice.loggedUser1.taskList.filter(r=>r.taskListName==this.taskservice.currentproject)[0].listOfTasksInProject
    .filter(r=>r.cardName==this.newtaskform.value.taskName).length>0){
      this.dialog.open(InfoDialogComponent,{width:"600px",height:"200px",data:{card:
        "Task with name already exists. Please try with a different name, or for task requiring same name try numbering",
      flag:false}});
    }else{
    this.taskservice.loggedUser1.taskList.filter(r=>r.taskListName==this.taskservice.currentproject)[0].listOfTasksInProject.push({
      cardName: this.newtaskform.value.taskName,
      taskPriority: this.newtaskform.value.priority,
      description: this.newtaskform.value.description,
      category: this.newtaskform.value.category,
      cardAssignee: this.newtaskform.value.assignee
    });
    let response=this.taskservice.updateUser(this.taskservice.loggedUser1);
    response.subscribe(data=>{
      console.log(data);
      this.taskservice.loggedUser1=data;
      console.log(this.taskservice.loggedUser1);
    });
    this.dash.updatedashboard();
  }
  }
  update(){
    this.taskservice.loggedUser1.taskList.filter(r=>r.taskListName==this.taskservice.currentproject)[0]
    .listOfTasksInProject.filter(r=>r.cardName==this.card.cardName)[0].cardName=this.newtaskform.value.taskName;
    this.taskservice.loggedUser1.taskList.filter(r=>r.taskListName==this.taskservice.currentproject)[0]
    .listOfTasksInProject.filter(r=>r.cardName==this.card.cardName)[0].category=this.newtaskform.value.category;
    this.taskservice.loggedUser1.taskList.filter(r=>r.taskListName==this.taskservice.currentproject)[0]
    .listOfTasksInProject.filter(r=>r.cardName==this.card.cardName)[0].description=this.newtaskform.value.description;
    this.taskservice.loggedUser1.taskList.filter(r=>r.taskListName==this.taskservice.currentproject)[0]
    .listOfTasksInProject.filter(r=>r.cardName==this.card.cardName)[0].taskPriority=this.newtaskform.value.priority;
    this.taskservice.loggedUser1.taskList.filter(r=>r.taskListName==this.taskservice.currentproject)[0]
    .listOfTasksInProject.filter(r=>r.cardName==this.card.cardName)[0].cardAssignee=this.newtaskform.value.assignee;
    let response=this.taskservice.updateUser(this.taskservice.loggedUser1);
    response.subscribe(data=>{
      console.log(data);
      this.taskservice.loggedUser1=data;
      console.log(this.taskservice.loggedUser1);
    });
     this.dash.updatedashboard();
  }
}
