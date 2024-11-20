import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dash',
  standalone: true,
  templateUrl: './admin-dash.component.html',
  imports:[ CommonModule, RouterModule],
  styleUrls: ['./admin-dash.component.css'],
})
export class AdminDashComponent implements OnInit {
  isAsideOpen:boolean = true;
  isServicesOpen: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  asideToggle(){

  }
  retour(){

  }
}
