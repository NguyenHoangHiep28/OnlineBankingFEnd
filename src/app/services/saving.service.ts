import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SavingPackages } from 'src/models/accounts/saving-package';
import { ListSaving } from 'src/models/list-saving';
const savingPackages_url = "https://localhost:44367/controller/saving-packages"
const createSaving_url = "https://localhost:44367/controller/create-saving"
const listSaving_url = "https://localhost:44367/controller/saving-list"

@Injectable({
  providedIn: 'root'
})
export class SavingService {

  constructor(private http : HttpClient) { }

  getSavingPackages (): Observable<SavingPackages[]> {
      return this.http.get<SavingPackages[]>(savingPackages_url)
  }

  CreateSavingBook (myReq : any) : Observable<any> {
    return this.http.post<any>(createSaving_url,myReq)
  }
  getSavingList (acc_number : any) : Observable<ListSaving[]> {
    return this.http.post<ListSaving[]>(listSaving_url,acc_number)
  }
}