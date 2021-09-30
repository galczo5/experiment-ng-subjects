import { Injectable } from '@angular/core';
import {interval, Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor() { }

  getObservable(): Observable<any> {
    return interval(1000)
      .pipe(
        tap(() => console.log('new value'))
      );
  }
}
