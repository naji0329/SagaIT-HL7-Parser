import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';

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
    return this.http.get("/hl72fhir", {responseType: 'text'})
    .pipe(
      tap( // Log the result or error
      {
        next: (data) => console.info(data),
        error: (error) => console.error(error)
      }
      )
    );
  }
}
