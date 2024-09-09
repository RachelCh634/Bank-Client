import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDonation } from '../models/donation.interface';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
 
  private readonly apiUrl: string = "https://localhost:7065/TimeDonations/GetAllDonations";
  private readonly apiUrl1: string = "https://localhost:7065/TimeDonations/AddDonation";


  constructor(private http: HttpClient) { }

  public GetAllDonations(): Observable<IDonation[]> {
    return this.http.get<IDonation[]>(this.apiUrl);
  }

  public AddDonation(donationData: any): Observable<any> {
    console.log(donationData)
    return this.http.post<any>(this.apiUrl1, donationData);
  }
}