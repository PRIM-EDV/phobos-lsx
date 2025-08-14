import { AfterViewInit, Component } from '@angular/core';
import { BackendService } from './infrastructure/backend.service';

declare global {
  interface Window {
    __env: {
      lsxServerHostname: string,
      lsxServerPort: string
    }
  }
}

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true
})
export class AppComponent implements AfterViewInit{
  

  constructor(private readonly backend: BackendService) {

  }

  ngAfterViewInit(): void {
    // this.backend.onOpen.subscribe(() => {

    // })
  }
}
