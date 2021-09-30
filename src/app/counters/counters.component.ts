import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Base} from "../util/Base";
import {interval} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";
import {StreamService} from "../stream.service";

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountersComponent extends Base implements OnInit {

  intervalCounter: number = 0;

  constructor(changeDetectorRef: ChangeDetectorRef,
              private readonly service: StreamService) {
    super(changeDetectorRef);
    console.log('CountersComponent created!')
  }

  ngOnInit(): void {
    this.$(this.service.getObservable())
      .pipe(
        tap(() => console.log('out pipe works')),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.intervalCounter += 1;
        console.log(this.intervalCounter);
      });

  }

}
