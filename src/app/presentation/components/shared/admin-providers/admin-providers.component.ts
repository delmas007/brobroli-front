import {Component, OnInit} from '@angular/core';
import {BrobroliService} from "@services/brobroli.service";
import {Providers} from "@interfaces/Provider";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-providers',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './admin-providers.component.html',
  styleUrl: './admin-providers.component.css'
})
export class AdminProvidersComponent implements OnInit {
  providers: Providers[] = [];
  constructor(private service:BrobroliService) { }

  ngOnInit() {
    this.listProviders()
  }
  listProviders() {
    this.service.getProviders().subscribe({
      next: (providers) => {
        this.providers = providers;
        console.log(providers);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deActiverProvider(id_provider: number) {
    this.service.deactivateProvider(id_provider).subscribe({
      next: (provider) => {
        console.log(provider);
        this.listProviders();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  activerProvider(id_provider: number) {
    this.service.activateProvider(id_provider).subscribe({
      next: (provider) => {
        console.log(provider);
        this.listProviders();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


}
