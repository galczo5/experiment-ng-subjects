import {ChangeDetectorRef } from "@angular/core";
import {Observable, PartialObserver, Subject, Subscription} from 'rxjs';

export class ChangeDetectionAwareSubject<T> extends Subject<T> {

  constructor(private stream$: Observable<T>,
              private readonly changeDetectorRef: ChangeDetectorRef) {
    super();
  }


  override subscribe(observerOrNext?: any, error?: any, complete?: any): Subscription {

    let nextFn = observerOrNext;
    let errorFn = error || (() => null);
    let completeFn = complete;

    if (observerOrNext && typeof observerOrNext === 'object') {
      const observer = observerOrNext as PartialObserver<unknown>;
      nextFn = observer.next?.bind(observer);
      errorFn = observer.error?.bind(observer);
      completeFn = observer.complete?.bind(observer);
    }

    return this.stream$
      .subscribe({
        next: (arg) => {
          nextFn(arg);
          this.changeDetectorRef.detectChanges();
        },
        error: errorFn,
        complete: completeFn
      }
    );

  }

  static from<T>(stream$: Observable<T>, changeDetectorRef: ChangeDetectorRef) {
    return new ChangeDetectionAwareSubject(stream$, changeDetectorRef);
  }

}
