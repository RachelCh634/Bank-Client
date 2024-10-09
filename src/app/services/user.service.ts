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

  public AddAdmin(userData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}/AddAdmin`, userData, {headers});
  }

  public GetAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetAllUsers`);
  }
  public GetUserById(userId: string): Observable<IUser> {
    const user = userId.toString().padStart(9, '0');
    return this.http.get<IUser>(`${this.baseUrl}/GetUserById/${user}`);
  }
  public GetUserDetails(): Observable<{ fullName: string, role: string, email:string }> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<{ fullName: string, role: string , email:string }>(`${this.baseUrl}/GetUserDetails`, { headers });
  }

  public IsAdmin(): Observable<boolean> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<boolean>(`${this.baseUrl}/IsUserAdmin`, { headers });
  }

  public DeleteUser(id: string): Observable<boolean> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<boolean>(`${this.baseUrl}/DeleteUser/${id}`, { headers });
  }

  public CountOfHoursAvailable(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}/CountOfHoursAvailable`,{headers});
  }
}