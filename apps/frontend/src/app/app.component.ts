import { AfterViewInit, Component, Inject, Optional } from '@angular/core';
import { BackendService } from './infrastructure/backend.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TOKEN_SERVICE_TOKEN, ITokenService } from '@phobos/core';

declare global {
  interface Window {
    __env: {
      LSX_SERVER_HOSTNAME: string,
      LSX_SERVER_PORT: string
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
  

  constructor(
      @Optional() @Inject(TOKEN_SERVICE_TOKEN) private tokenService: ITokenService
  ) {

  }

  ngAfterViewInit(): void {
    // this.backend.onOpen.subscribe(() => {

    // })
  }
}
