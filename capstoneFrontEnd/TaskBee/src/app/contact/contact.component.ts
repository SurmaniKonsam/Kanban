import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

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
    this.route.navigate(["about"]);
  }

  nav3()
  {
    this.route.navigate([""]);
  }
}
