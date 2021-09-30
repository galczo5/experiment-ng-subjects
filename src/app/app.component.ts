import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'experiment-ng-subjects';
  visible: boolean = false;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  toggle() {
    this.visible = !this.visible;
    this.changeDetectorRef.detectChanges();
  }
}
