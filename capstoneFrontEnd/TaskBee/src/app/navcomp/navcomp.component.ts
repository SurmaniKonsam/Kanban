import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BackendserviceService } from '../services/backendservice.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectComponent } from '../add-project/add-project.component';
import { User } from '../model/user.model';
import { DashboardcompComponent } from '../dashboardcomp/dashboardcomp.component';
import { TaskList } from '../model/task-list.model';
import { TaskCard } from '../model/task-card.model';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-navcomp',
  templateUrl: './navcomp.component.html',
  styleUrls: ['./navcomp.component.css']
})
export class NavcompComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,public backserv:BackendserviceService,private route:Router,
    public dialog:MatDialog,private dash:DashboardcompComponent) {}
    user1:User=new User;
  ngOnInit(): void {
    if(this.backserv.loggedIn==true){
        this.backserv.getLoggedInUser().subscribe(data=>{
          this.user1=data;
        })
    }
  }
      hide:boolean=false;
  
  logout(){
    this.hide=false;
    this.backserv.loggedIn=false;
    this.route.navigate(["login"]);
  }
  dummyproject=new TaskList;
  add(){
    this.dummyproject.taskListName=null;
    this.dummyproject.projectPriority=null;
    this.dummyproject.listOfUsers=[];
    this.dummyproject.listOfTasksInProject=[];
    this.dummyproject.date=null;
    this.dummyproject.category=[];
    this.dialog.open(AddProjectComponent,{
      width:"400px",
      data:{project:this.dummyproject,flag:false}
    });
  }
  date:String|null|undefined;
  project(projectName:String|undefined|null){
      this.backserv.currentproject=projectName;
      this.backserv.hideDashDiv=false;
      console.log(this.backserv.currentproject);
      //console.log(this.backserv.loggedUser1.taskList.filter(r=>r.taskListName==this.backserv.currentproject)[0].date);
      this.date=this.backserv.loggedUser1.taskList.filter(r=>r.taskListName==this.backserv.currentproject)[0].date;
      this.backserv.matDivLen=this.backserv.loggedUser1.taskList.filter(r=>r.taskListName==this.backserv.currentproject)[0]
      .category.length*320;
      this.backserv.projectDue=this.date?.slice(0,10);
      //console.log(this.dash.date);
      this.dash.currentproject();
  }


  deleteProject(projectname:String|null|undefined){
    const tasklist=this.backserv.loggedUser1.taskList.filter(r=>r.taskListName!=projectname);
    this.backserv.loggedUser1.taskList=tasklist;
    let response=this.backserv.updateUser(this.backserv.loggedUser1);
    response.subscribe(data=>{
      this.backserv.loggedUser1=data;
      console.log(this.backserv.loggedUser1);
    });
    this.backserv.currentproject="";
    this.backserv.hideDashDiv=true;
  }

  addTask() {
    let card1: TaskCard = new TaskCard;
    card1.cardName = null;
    card1.category = null;
    card1.description = null;
    card1.taskPriority = null;
    card1.cardAssignee = null;
    this.dialog.open(TaskDialogComponent, {
      width: "400px",
      data: { card: card1, flag: false }
    });
  }
  filterHigh(){
    this.backserv.taskcards1=this.backserv.loggedUser1.taskList.filter(r=>r.taskListName==this.backserv.currentproject)[0]
    .listOfTasksInProject.filter(r=>r.taskPriority=="HIGH");
  }
  filterLow(){
    this.backserv.taskcards1=this.backserv.loggedUser1.taskList.filter(r=>r.taskListName==this.backserv.currentproject)[0]
    .listOfTasksInProject.filter(r=>r.taskPriority=="LOW");
  }
  filterNone(){
    this.backserv.taskcards1=this.backserv.loggedUser1.taskList.filter(r=>r.taskListName==this.backserv.currentproject)[0]
    .listOfTasksInProject;
  }
  filterUrgent(){
    this.backserv.taskcards1=this.backserv.loggedUser1.taskList.filter(r=>r.taskListName==this.backserv.currentproject)[0]
    .listOfTasksInProject.filter(r=>r.taskPriority=="URGENT");
  }
  filterNormal(){
    this.backserv.taskcards1=this.backserv.loggedUser1.taskList.filter(r=>r.taskListName==this.backserv.currentproject)[0]
    .listOfTasksInProject.filter(r=>r.taskPriority=="NORMAL");
  }
  
}
