import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDonation } from '../models/donation.interface';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string = "https://localhost:7065/Users";

  constructor(private http: HttpClient) { }

  public AddUser(userData: any): Observable<any> {
    console.log(userData)
    return this.http.post<any>(`${this.baseUrl}/AddUser`, userData);
  }

  public GetAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/GetAllUsers`);
  }
}
