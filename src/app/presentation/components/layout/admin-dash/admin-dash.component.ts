import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {StateService} from "@services/state.service";

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
  constructor(private state: StateService,private router:Router) { }

  ngOnInit() {
  }

  asideToggle(){

  }
  logout() {
    localStorage.removeItem('token');
    this.state.setAuthState({
      id : undefined,
      isAuthenticated : false,
      username : undefined,
      role : undefined,
      token: undefined,
      mail: undefined
    });
    this.router.navigate(['/login']);
  }
}
