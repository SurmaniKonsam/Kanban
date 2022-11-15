import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendserviceService } from '../services/backendservice.service';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadGuard implements CanLoad {
  constructor(private taskserv:BackendserviceService){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.taskserv.loggedIn){
        return true;
      }else{
        return false;
      }
  }
}
