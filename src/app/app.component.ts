import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "@layout/navbar/navbar.component";
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import AOS from 'aos';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterLink, RouterLinkActive, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'prestaci';
  ngOnInit() {AOS.init();}


}
