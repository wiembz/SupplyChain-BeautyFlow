import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cpodash',
  templateUrl: './cpodash.component.html',
  styleUrls: ['./cpodash.component.css']
})
export class CPODashComponent {
  dashboardUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
'https://app.powerbi.com/reportEmbed?reportId=6c0b00c7-aebb-45d0-b510-2ce3c0de50d7&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'
);
  }

  ngOnInit(): void {
  }
  navigateToPrediction(): void {
    this.router.navigate(['/serie']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
