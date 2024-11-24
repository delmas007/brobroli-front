import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Inscription} from "../../domains/interfaces/Inscription";
import {Login} from "../../domains/interfaces/Login";
import {Balance} from "../../domains/interfaces/balance";
import {Service} from "../../domains/interfaces/Service";
import {Skills} from "../../domains/interfaces/Skills";
import {BalanceSum} from "../../domains/interfaces/balanceSum";
import {UpdatePasswordDTO} from "@interfaces/UpdatePasswordDTO";
@Injectable({
  providedIn: 'root'
})
export class BrobroliService {

  private host : string = '/host/api';
  private hostAuth : string = '/host/authe';

  constructor(private http: HttpClient) { }

  inscriptionProvider(donnee:FormData): Observable<any> {
    return this.http.post<any>(`${this.hostAuth}/providers`, donnee);
  }
  inscriptionCustomer(donnee:FormData): Observable<any> {
    return this.http.post<any>(`${this.hostAuth}/customers`, donnee);
  }
  login(donnee:Login): Observable<any> {
    return this.http.post<any>(`${this.hostAuth}/authenticate`, donnee);
  }
  getProvider(id:number): Observable<any> {
    return this.http.get<any>(`${this.host}/providers/id/${id}`);
  }
  getCustomer(id:number): Observable<any> {
    return this.http.get<any>(`${this.host}/customers/id/${id}`);
  }
  recharge(balance:Balance,id:number):Observable<any>{
    return this.http.post(`${this.host}/customers/${id}`,balance)
  }
  retrait(sum:number,id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/providers/retrait/${sum}/${id}`, {});
  }
  retraitCustomer(sum:number,id:number): Observable<any> {
    return this.http.get<any>(`${this.host}/customers/retrait/${sum}/${id}`);
  }
  saveService(service:Service,id:number): Observable<any> {
    return this.http.post<any>(`${this.host}/providers/service/${id}`, service);
  }
  search(typeService:string,minPrice:number,maxPrice:number): Observable<any>{
    return this.http.get<any>(`${this.host}/services/${typeService}/${minPrice}/${maxPrice}`);
  }
  saveSkill(id:number,skill:Skills): Observable<any> {
    return this.http.post<any>(`${this.host}/providers/skill/${id}`, skill);
  }
  getCollaborationProvider(id:number): Observable<any> {
    return this.http.get<any>(`${this.host}/providers/collaboration/provider/${id}`);
  }
  getCollaborationCustomer(id:number): Observable<any> {
    return this.http.get<any>(`${this.host}/customers/collaborationss/customer/${id}`);
  }
  collaborer(serviceId:number,id_customer:number,): Observable<any> {
    return this.http.post<any>(`${this.host}/customers/collaboration/${serviceId}/${id_customer}`,{});
  }
  rechargeCustomer(balance:BalanceSum,id:number):Observable<any>{
    return this.http.post(`${this.host}/customers/balance/${id}`,balance)
  }
  accepterCollaboration(id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/providers/collaboration/accept/${id}`, {});
  }
  refuserCollaboration(id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/providers/collaboration/reject/${id}`, {});
  }
  terminerCollaboration(id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/providers/collaboration/terminer/${id}`, {});
  }
  terminerCollaborationCustomer(id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/customers/collaboration/terminer/${id}`, {});
  }
  annulerCollaboration(id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/customers/collaboration/annuler/${id}`, {});
  }
  activationCompte(code:string): Observable<any>{
    return this.http.post<any>(`${this.host}/validation/active-account/${code}`,{})
  }
  renvoyerMail(mail:string): Observable<any>{
    return this.http.post<any>(`${this.host}/validation/resend-mail/${mail}`,{})
  }
  envoyerCodeReinitialisation(mail:string): Observable<any>{
    return this.http.post<any>(`${this.host}/validation/send-code-reset-password/${mail}`,{})
  }
  nouveauMotDePasse(password:any): Observable<any>{
    console.log(password)
    return this.http.post<any>(`${this.host}/validation/nouveau-mot-de-passe`,password)
  }
  getInfoUser(): Observable<any> {
    return this.http.get<any>(`${this.host}/v1/admin`);
  }
  getServices(): Observable<any> {
    return this.http.get<any>(`${this.host}/v1/admin/service`);
  }
  getCustomers(): Observable<any> {
    return this.http.get<any>(`${this.host}/v1/admin/customers`);
  }
  getProviders(): Observable<any> {
    return this.http.get<any>(`${this.host}/v1/admin/providers`);
  }
  validSercice(id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/v1/admin/service/valid/${id}`, {});
  }
  rejectService(id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/v1/admin/service/reject/${id}`, {});
  }
  activateProvider(id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/v1/admin/provider/activate/${id}`, {});
  }
  deactivateProvider(id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/v1/admin/provider/deactivate/${id}`, {});
  }
  activateCustomer(id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/v1/admin/customer/activate/${id}`, {});
  }
  deactivateCustomer(id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/v1/admin/customer/deactivate/${id}`, {});
  }
  updateCustomer(donnee:FormData,id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/customers/${id}`, donnee);
  }
  updateProvider(donnee:FormData,id:number): Observable<any> {
    return this.http.put<any>(`${this.host}/providers/${id}`, donnee);
  }
}
