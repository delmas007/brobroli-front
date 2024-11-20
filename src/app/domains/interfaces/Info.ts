import {Provider} from "@angular/core";
import {Customer} from "@interfaces/Customer";
import {Providers} from "@interfaces/Provider";

export interface Info {
  numberUser: number;
  numberProvider: number;
  numberCustomer: number;
  pourcentageProvider: number;
  pourcentageCustomer: number;
  numberServiceEnAttente: number;
  numberCollaborationReussi: number;
  revenue: number;
  listProvider: Providers[];
  listCustomer: Customer[];
  numberProviderWithService: number;
}
