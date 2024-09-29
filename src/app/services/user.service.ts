import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string = "https://localhost:7065/Users";

  constructor(private http: HttpClient, private authService: AuthService) { }

  login(userData: any): Observable<any> {
    return this.http.post('https://localhost:7065/api/Login', userData);
  }

  public AddUser(userData: any): Observable<any> {
    console.log(userData)
    return this.http.post<any>(`${this.baseUrl}/AddUser`, userData);
  }

  public GetAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/GetAllUsers`);
  }

  public GetUserName(): Observable<string> {
    const token = this.authService.getToken();
    console.log('Sending donation with token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/GetUserName`, { headers, responseType: 'text' });
  }

  public GetUserById(userId: number): Observable<IUser> {
    const user = userId.toString().padStart(9, '0');
    return this.http.get<IUser>(`${this.baseUrl}/GetUserById/${user}`);
  }
}