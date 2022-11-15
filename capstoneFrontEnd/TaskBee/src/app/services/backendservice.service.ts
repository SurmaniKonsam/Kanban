import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardcompComponent } from '../dashboardcomp/dashboardcomp.component';
import { LoginUser } from '../model/login-user.model';
import { TaskCard } from '../model/task-card.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {
  loggedUser1: User = new User;
  loggedIn: boolean = false;
  loggedinuser: String | undefined | null;
  currentproject: String | undefined | null;
  categories: Array<String | null | undefined> = [];
  taskcards: Array<any> = [];
  taskcards1: Array<TaskCard> = [];
  todolist: Array<TaskCard> = [];
  progresslist: Array<TaskCard> = [];
  validatelist: Array<TaskCard> = [];
  completelist: Array<TaskCard> = [];
  hideDashDiv: boolean = false;
  matDivLen: number = 0;
  projectDue: String | null | undefined;
  cardnameForSearch: Array<String | null | undefined> = [];
  constructor(private http: HttpClient) {
  }
  apiUrl = 'http://localhost:8082/task-manager/find-user'
  apiUrl2 = 'http://localhost:8081/authenticate/getAllUsers'
  apiUrl3 = 'http://localhost:8082/task-manager/update-user'
  apiUrl4 = 'http://localhost:8081/authenticate/login'
  apiUrl5 = 'http://localhost:8082/task-manager/add-user'
  botUrl= 'https://TaskBeeBot'
    sendEmail(url: string, data: any) {
      return this.http.post(url, data);
    }

  getLoggedInUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${this.loggedinuser}`);
  }
  loginuser(): Observable<Array<LoginUser>> {
    return this.http.get<Array<LoginUser>>(this.apiUrl2);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl3, user);
  }
  loginuser2(user: LoginUser): Observable<Response> {
    return this.http.post<Response>(this.apiUrl4, user);
  }
  registeruUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl5, user);
  }
}
