import {ChangeDetectorRef, Component, OnDestroy} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {ChangeDetectionAwareSubject} from "./ChangeDetectionAwareSubject";

@Component({
  template: ''
})
export class Base implements OnDestroy {

  protected readonly destroy$ = new Subject();

  constructor(protected readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.onDestroy();
  }

  onDestroy() {}

  $<T = any>(stream$: Observable<T>) {
    return new ChangeDetectionAwareSubject(stream$, this.changeDetectorRef)
  }

}
