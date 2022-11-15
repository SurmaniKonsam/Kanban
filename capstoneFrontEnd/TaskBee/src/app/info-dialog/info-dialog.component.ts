import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskCard } from '../model/task-card.model';
import { BackendserviceService } from '../services/backendservice.service';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  constructor(private taskservice:BackendserviceService,
    @Inject(MAT_DIALOG_DATA)public data:any|null) 
  {
  this.card=data.card;
 }
 card:TaskCard;
  ngOnInit(): void {
    console.log(this.card);
  }

}
