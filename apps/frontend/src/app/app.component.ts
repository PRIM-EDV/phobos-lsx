import { AfterViewInit, Component } from '@angular/core';
import { BackendService } from './backend/backend.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent implements AfterViewInit{
  

  constructor(private readonly backend: BackendService) {

  }

  ngAfterViewInit(): void {
    this.backend.onOpen.subscribe(() => {

    })
  }
}
