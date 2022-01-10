import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  constructor() { }
  sSelectedThemeValue = new BehaviorSubject<string>("");
}

