import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDonation } from '../models/donation.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  private readonly baseUrl: string = "https://localhost:7065/TimeDonations";

  constructor(private http: HttpClient, private authService: AuthService) { }

  public GetAllDonations(): Observable<IDonation[]> {
    return this.http.get<IDonation[]>(`${this.baseUrl}/GetAllDonations`);
  }

  public GetYourDonations(): Observable<IDonation[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<IDonation[]>(`${this.baseUrl}/GetYourDonations`, { headers });
  }

  public GetYourTakes(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}/GetYourTake`, { headers });
  }

  public AddDonation(donationData: any): Observable<any> {
    console.log(donationData);
    const token = this.authService.getToken();
    console.log('Sending donation with token:', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}/AddDonation`, donationData, { headers });
  }
  public DeductAvailableHours(hours: number, Id: number): Observable<any> {
    console.log('Selected Hours:', hours);
    console.log('Donation ID:', Id);
    const params = new HttpParams()
      .set('hours', hours.toString())
      .set('Id', Id.toString());
    const token = this.authService.getToken();
    console.log(token)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.baseUrl}/DeductAvailableHours`, {}, { params, headers });
  }

  public DeleteDonation(id: number){
    return this.http.delete<boolean>(`${this.baseUrl}/DeleteDonation/${id}`);
  }

  public AddLike(id:number):Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(id);
    return this.http.post<any>(`${this.baseUrl}/AddLike`,id, { headers });
  }
}