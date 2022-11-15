import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  nav(){
      this.route.navigate(["login"]);
  }
  nav1(){
    this.route.navigate(["register"]);
  }
}
