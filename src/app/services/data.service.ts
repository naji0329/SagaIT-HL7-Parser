import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  oWordToSearch = new BehaviorSubject<any>({header : "", word : ""});
  sTreeViewData = new BehaviorSubject<string>("");
  constructor() { }
}
