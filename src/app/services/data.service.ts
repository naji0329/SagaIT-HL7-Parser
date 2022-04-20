import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, tap, concatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  oWordToSearch = new BehaviorSubject<any>({header : "", word : ""});
  sTreeViewData = new BehaviorSubject<string>("");
  oWordToFilter = new BehaviorSubject<any>("");
  oWordToUpdate = new BehaviorSubject<any>({header : "", word : ""});
  
  constructor(private http: HttpClient) { }

  convertHL7ToFHIR(sHL7: string) {
    return this.http.get("https://localhost:9443/api/anti-forgery-token",
    { 
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      }),
      observe: 'body',
      withCredentials: true
    }).pipe(
      tap((res: string) => console.log('crsf token:', res)),
      concatMap((token: string) => this.http.post("/api/hl72fhir", 
        {'hl7': sHL7}, 
        { 
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'x-csrf-token': token
          }),
          observe: 'body',
          withCredentials: true
        })),
        tap(res => console.log('fhir result:', res))
    );
  }
}
