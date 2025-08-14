import { AfterViewInit, Component } from '@angular/core';
import { BackendService } from './infrastructure/backend.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

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
    imports: [
      CommonModule,
      RouterOutlet
    ],
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
