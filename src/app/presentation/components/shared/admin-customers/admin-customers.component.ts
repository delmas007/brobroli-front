import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import {BrobroliService} from "@services/brobroli.service";
import {Providers} from "@interfaces/Provider";
import {Customer} from "@interfaces/Customer";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
interface Users{
  urlProfile:string
  name:string
  role:string
}
@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [TableModule, NgIf, DatePipe, NgForOf],
  templateUrl: './admin-customers.component.html',
  styleUrl: './admin-customers.component.css'
})


export class AdminCustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private service: BrobroliService) {}
  ngOnInit(): void {
    this.listCustomer()
  }
  listCustomer() {
    this.service.getCustomers().subscribe({
      next: (customer) => {
        this.customers = customer;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deActiverCustomer(id_customer: number) {
    this.service.deactivateCustomer(id_customer).subscribe({
      next: (customer) => {
        console.log(customer);
        this.listCustomer();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  activerCustomer(id_customer: number) {
    this.service.activateCustomer(id_customer).subscribe({
      next: (customer) => {
        console.log(customer);
        this.listCustomer();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }



}
