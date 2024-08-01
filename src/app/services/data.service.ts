import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, tap, concatMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  oWordToSearch = new BehaviorSubject<any>({ header: "", word: "" });
  sTreeViewData = new BehaviorSubject<string>("");
  oWordToFilter = new BehaviorSubject<any>("");
  oWordToUpdate = new BehaviorSubject<any>({ header: "", word: "" });

  constructor(private http: HttpClient) { }

  convertHL7ToFHIR(sHL7: string) {
    let fhirResult: any;

    if (environment.enableCrsfTokenRequest) {
      fhirResult = this.getAntiForgeryToken()
        .pipe(
          tap((res: string) => console.log('crsf token:', res)),
          concatMap((token: string) => this.callConversionService(sHL7, token)),
          tap(res => console.log('fhir result:', res))
        );
    } else {
      fhirResult = this.callConversionService(sHL7, "");
    }

    return fhirResult;
  }

  private getAntiForgeryToken() {
    return this.http.get("/api/anti-forgery-token",
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        observe: 'body',
        withCredentials: true
      });
  }

  private callConversionService(sHL7: string, token: string): Observable<Object> {
    return this.http.post(environment.hl7CsharpConvertUrl,
      { 'hl7': sHL7 },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-csrf-token': token
        }),
        observe: 'body',
        withCredentials: true
      });
  }
}
