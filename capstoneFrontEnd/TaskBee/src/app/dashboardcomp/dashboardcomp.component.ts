import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { BackendserviceService } from '../services/backendservice.service';
import { User } from '../model/user.model';
import { TaskCard } from '../model/task-card.model';
import { TaskList } from '../model/task-list.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { NavcompComponent } from '../navcomp/navcomp.component';
import { BooleanInput } from '@angular/cdk/coercion';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddProjectComponent } from '../add-project/add-project.component';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-dashboardcomp',
  templateUrl: './dashboardcomp.component.html',
  styleUrls: ['./dashboardcomp.component.css']
})
export class DashboardcompComponent implements OnInit {

  User1: User = new User;
  matDividerLength: number = 0;
  constructor(private breakpointObserver: BreakpointObserver, public taskservice: BackendserviceService, public dialog: MatDialog
    , private bottomSheet: MatBottomSheet) { }
  ngOnInit(): void {
    if (this.taskservice.currentproject == "" || null || undefined) {
      this.taskservice.hideDashDiv = true;
    } else {
      this.taskservice.hideDashDiv = false;
    }
    this.taskservice.hideDashDiv = true;
    console.log(this.taskservice.hideDashDiv);
    this.taskservice.getLoggedInUser().subscribe(data => {
      this.User1 = data;

      console.log("Number of columns :: ", this.User1.taskList[0].category.length)
      // this.matDividerLength = this.User1.taskList[1].category.length*320; //dont chanag it
      // this.matDividerLength = 7*320;
      console.log("Length of the divider :: ", this.matDividerLength);
      this.taskservice.loggedUser1 = data;
      // this.User1.taskList.filter(r => {
      //   if (r.category.length > this.dynamic) {
      //     console.log("lengths:",r.category.length)
      //     this.dynamic = r.category.length;
      //     this.taskservice.matDivLen = this.dynamic * 100;
      //     console.log("width length::",this.taskservice.matDivLen);
      //   }
      // })
      this.taskservice.matDivLen = 4 * 380;

    });
    //this.date=this.taskservice.loggedUser1.taskList.filter(r=>r.taskListName==this.taskservice.currentproject)[0].date;
  }
  date: String | null | undefined;
  dynamic: number = 0;
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
    this.taskservice.cardnameForSearch = [];
    this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject
      .filter(r => {
        if (r.cardName != "") {
          this.taskservice.cardnameForSearch.push(r.cardName);
        }
      });
  }
  currentProject: Array<TaskList> = [];
  categories: Array<String> = [];
  tasklists: Array<TaskList> = [];
  taskcards: Array<any> = [];
  taskcards1: Array<TaskCard> = [];
  todolist: Array<TaskCard> = [];
  currentproject() {
    if (this.taskservice.currentproject == "" || null || undefined) {
      this.taskservice.hideDashDiv = true;
    } else {
      this.taskservice.hideDashDiv = false;
      this.currentProject = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject);
      this.taskservice.categories = this.currentProject[0].category;
      this.taskservice.taskcards = this.currentProject[0].listOfTasksInProject;
      this.taskservice.taskcards1 = this.taskservice.taskcards;
      // this.taskservice.todolist = this.taskservice.taskcards1.filter(r => r.category == "TODO");
      // this.taskservice.progresslist = this.taskservice.taskcards1.filter(r => r.category == "IN-PROGRESS");
      // this.taskservice.validatelist = this.taskservice.taskcards1.filter(r => r.category == "VALIDATE");
      // this.taskservice.completelist = this.taskservice.taskcards1.filter(r => r.category == "COMPLETE");
      //this.date=this.currentProject[0].date;
      this.taskservice.cardnameForSearch = [];
      this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject
        .filter(r => {
          if (r.cardName != "") {
            this.taskservice.cardnameForSearch.push(r.cardName);
          }
        });
    }
    this.taskservice.matDivLen = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].category.length * 320;
    if (this.taskservice.matDivLen < 4 * 380) {
      this.taskservice.matDivLen = 4 * 380;
    }

  }
  filterProject() {

  }
  col: String = "blue";
  updatedashboard() {
    console.log(this.taskservice.loggedUser1);
    this.currentProject = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject);
    this.taskservice.currentproject = this.currentProject[0].taskListName;
    console.log(this.taskservice.currentproject);
    this.taskservice.categories = this.currentProject[0].category;
    this.taskservice.taskcards = this.currentProject[0].listOfTasksInProject;
    this.taskservice.taskcards1 = this.taskservice.taskcards;
  }



  checked1: Boolean = false;
  progressBar = false;
  colsinproject: Array<String | null | undefined> = [];
  currentcolumn: String | null | undefined;
  nextcolumn: String | null | undefined;
  showLoader: boolean = false;

  move(cardname: String | null | undefined) {
    this.showLoader = true;
    this.showSpinner(this.showLoader);
    // this.progressBar = true;
    setTimeout(() => {
      this.showLoader = false;
      this.showSpinner(this.showLoader);
      // this.progressBar = false;
      this.taskservice.progresslist = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)
      [0].listOfTasksInProject.filter(r => r.category == "IN-PROGRESS");
      let currentcard = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0]
        .listOfTasksInProject.filter(r => r.cardName == cardname)[0];

      this.nextcolumn = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject
        .filter(r => r.cardName == cardname)[0].category;
      this.colsinproject = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].category;

      if (this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject
        .filter(r => r.cardName == cardname)[0].category != this.colsinproject[this.colsinproject.length - 1]) {
        for (let i = 0; i < this.colsinproject.length; i++) {
          if (this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject
            .filter(r => r.cardName == cardname)[0].category == this.colsinproject[i]) {
            this.currentcolumn = this.colsinproject[i];
            this.nextcolumn = this.colsinproject[i + 1];
            console.log(this.nextcolumn);
          }
        }
        console.log((this.taskservice.progresslist.filter(r => r.cardAssignee == currentcard.cardAssignee)));
        if ((this.nextcolumn == "IN-PROGRESS")
          && (currentcard.category == "TODO")
          && (this.taskservice.progresslist.filter(r => r.cardAssignee == currentcard.cardAssignee)).length > 0) {

          //alert("User " + currentcard.cardAssignee + " already has a task in progress. Please complete it!!");
          this.dialog.open(InfoDialogComponent, {
            data: {
              card: "user " + currentcard.cardAssignee +
                " already has a task in progress", flag: false, flag2: false
            }
          });

        } else {
          this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject
            .filter(r => r.cardName == cardname)[0].category = this.nextcolumn;

          let response = this.taskservice.updateUser(this.taskservice.loggedUser1);
          response.subscribe(data => {
            this.taskservice.loggedUser1 = data;

          });
        }
      }
      this.updatedashboard();
    }, 1186)
  }


  move1(cardname: String | null | undefined) {
    this.showLoader = true;
    this.showSpinner(this.showLoader);
    // this.progressBar = true;
    setTimeout(() => {
      // this.progressBar = false;
      this.showLoader = false;
      this.showSpinner(this.showLoader);
      this.nextcolumn = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject
        .filter(r => r.cardName == cardname)[0].category;
      this.colsinproject = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].category;

      if (this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject
        .filter(r => r.cardName == cardname)[0].category != this.colsinproject[0]) {
        for (let i = 0; i < this.colsinproject.length; i++) {
          if (this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject
            .filter(r => r.cardName == cardname)[0].category == this.colsinproject[i]) {
            this.currentcolumn = this.colsinproject[i];
            this.nextcolumn = this.colsinproject[i - 1];
            console.log(this.nextcolumn);
          }
        }
        this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject
          .filter(r => r.cardName == cardname)[0].category = this.nextcolumn;

        let response = this.taskservice.updateUser(this.taskservice.loggedUser1);
        response.subscribe(data => {
          this.taskservice.loggedUser1 = data;

        });
      }
      this.updatedashboard();
    }, 1186)
  }

  delete(cardname: String | null | undefined) {
    this.showLoader = true;
    this.showSpinner(this.showLoader);
    // this.progressBar = true;
    setTimeout(() => {
      this.showLoader = false;
      this.showSpinner(this.showLoader);
      // this.progressBar = false;
      const tlist = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject
        .filter(r => r.cardName != cardname);
      this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject = tlist;
      let response = this.taskservice.updateUser(this.taskservice.loggedUser1);
      response.subscribe(data => {
        this.taskservice.loggedUser1 = data;
        console.log(this.taskservice.loggedUser1);
      });
      this.updatedashboard();
    }, 1186)
  }

  card: TaskCard | null | undefined;
  editcard(cardname: String | null | undefined) {
    this.showLoader = true;
    this.showSpinner(this.showLoader);
    setTimeout(() => {
      this.showLoader = false;
      this.showSpinner(this.showLoader);
      this.card = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0]
        .listOfTasksInProject.filter(r => r.cardName == cardname)[0];
      this.dialog.open(TaskDialogComponent, { width: "400px", data: { card: this.card, flag: true } });
    }, 1186)

  }

  columnform = new FormGroup({
    columnname: new FormControl('', Validators.required)
  });
  step: number | undefined;
  setStep(index: number) {
    this.step = index;
  }

  addcolumn() {
    this.showLoader = true;
    this.showSpinner(this.showLoader);
    setTimeout(() => {
      this.showLoader = false;
      this.showSpinner(this.showLoader);
      console.log(this.columnform.value.columnname);
      if (this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].category
        .filter(r => r == this.columnform.value.columnname).length > 0) {
        this.dialog.open(InfoDialogComponent, {width:"600px",height:"170px", data: { card: "Duplicate column name! try with diffrent name.", flag: false } });
      } else {
        this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].category.push(
          this.columnform.value.columnname
        );
        let response = this.taskservice.updateUser(this.taskservice.loggedUser1);
        response.subscribe(data => {
          this.taskservice.loggedUser1 = data;
          console.log(this.taskservice.loggedUser1);
        });
        this.step = 1;
        this.User1 = this.taskservice.loggedUser1;
        this.taskservice.matDivLen = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].category.length * 310;
        if (this.taskservice.matDivLen < 4 * 380) {
          this.taskservice.matDivLen = 4 * 380;
        }
        this.updatedashboard();
      }
    }, 1186)

  }


  deleteProject(projectname: String | null | undefined) {
    this.showLoader = true;
    this.showSpinner(this.showLoader);
    // this.progressBar = true;
    setTimeout(() => {
      this.showLoader = false;
      this.showSpinner(this.showLoader);
      // this.progressBar = false;
      const tasklist = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName != projectname);
      this.taskservice.loggedUser1.taskList = tasklist;
      let response = this.taskservice.updateUser(this.taskservice.loggedUser1);
      response.subscribe(data => {
        this.taskservice.loggedUser1 = data;
        console.log(this.taskservice.loggedUser1);
      });
      this.taskservice.currentproject = "";
      this.taskservice.hideDashDiv = true;
    }, 1186)
  }


  project1: TaskList | null | undefined;
  updateProject(projectname: String | null | undefined) {
    this.showLoader = true;
    this.showSpinner(this.showLoader);
    // this.progressBar = true;
    setTimeout(() => {
      this.showLoader = false;
      this.showSpinner(this.showLoader);
      // this.progressBar = false;
      this.project1 = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == projectname)[0];
      this.dialog.open(AddProjectComponent, {
        width: "400px",
        data: { project: this.project1, flag: true }
      })
    }, 1186)
  }


  tempuser: User = new User;
  remaindercards: Array<TaskCard> = [];
  remaindercategories: Array<String | null | undefined> = [];
  deleteColumn(name: String | null | undefined) {
    this.showLoader = true;
    this.showSpinner(this.showLoader);
    setTimeout(() => {
      this.showLoader = false;
      this.showSpinner(this.showLoader);
      console.log(name);
      this.remaindercards = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject
        .filter(r => r.category != name);
      this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].listOfTasksInProject =
        this.remaindercards;
      this.remaindercategories = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0]
        .category.filter(r => r != name);
      this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0]
        .category = this.remaindercategories;
      let response = this.taskservice.updateUser(this.taskservice.loggedUser1);
      response.subscribe(data => {
        this.taskservice.loggedUser1 = data;
        console.log("Updated delete column");
      });
      this.taskservice.matDivLen = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0].category.length * 380;
      if (this.taskservice.matDivLen < 4 * 380) {
        this.taskservice.matDivLen = 4 * 380;
      }
      this.updatedashboard();
    }, 1186)

  }

  infoCard(cardname: String | null | undefined) {
    this.showLoader = true;
    this.showSpinner(this.showLoader);
    setTimeout(() => {
      this.showLoader = false;
      this.showSpinner(this.showLoader);
      this.card = this.taskservice.loggedUser1.taskList.filter(r => r.taskListName == this.taskservice.currentproject)[0]
        .listOfTasksInProject.filter(r => r.cardName == cardname)[0];
      this.dialog.open(InfoDialogComponent, { width: "770px", height: "480px", data: { card: this.card, flag: true } });
    }, 1186)

  }

  search: String = "";
  searchMethod() {
    // console.log(this.search);
    this.infoCard(this.search);
    this.search = "";
  }
  moveTo(name: String | null | undefined, categ: String | null | undefined) {
    // console.log(name);
    // console.log(categ);
    // console.log(event.container);
    // console.log(event.previousContainer);
    this.move(name);
  }
  openBottomSheet() {

  }


  showSpinner(value: boolean) {
    if (value == true) {
      const timeout = 1000;
      const dialogRef = this.dialog.open(SpinnerComponent, {
        width: '300px',
        data: {}
      });

      dialogRef.afterOpened().subscribe(_ => {
        setTimeout(() => {
          dialogRef.close();
        }, timeout)
      })
    }
  }

}
