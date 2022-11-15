import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  nav(){
      this.route.navigate(["login"]);
  }
  nav1(){
    this.route.navigate(["register"]);
  }

  nav2(){
    this.route.navigate(["contact"]);
  }
  nav3(){
    this.route.navigate([""]);
  }
}
