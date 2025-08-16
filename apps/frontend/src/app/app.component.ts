import { AfterViewInit, Component, effect, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TOKEN_SERVICE_TOKEN, ITokenService } from '@phobos/core';
import { LsxGateway } from './infrastructure/lsx.gateway';
import { OverlayComponent } from './overlay/overlay.component';

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
    RouterOutlet,
    OverlayComponent
  ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true
})
export class AppComponent {

  autoGatewayConnection = effect(() => {
    console.log('Auto connecting to Lsx Gateway...');
    if (this.tokenService && !this.lsxGateway.isConnected()) {
      this.connectToLsxGateway().catch(error => {
        console.error('Failed to connect to Lsx Gateway:', error);
      });
    }
  });

  constructor(
    public readonly lsxGateway: LsxGateway,
    @Optional() @Inject(TOKEN_SERVICE_TOKEN) private tokenService: ITokenService
  ) {
    if (!this.tokenService) {
      console.warn('Token service is not available, skipping Lsx Gateway connection');
    }
  }

  async ngOnInit(): Promise<void> {
    if (!this.tokenService) {
      console.warn('Token service is not available, skipping Maptool Gateway connection');
    }
  }

  private async connectToLsxGateway(): Promise<void> {
    const token = this.tokenService?.accessToken() || '';
    if (token) {
      await this.lsxGateway.connect(token);
    } else {
      console.warn('No token found, unable to connect to Lsx Gateway');
    }
  }
}
