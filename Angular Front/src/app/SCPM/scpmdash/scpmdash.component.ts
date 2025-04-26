import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-scpmdash',
  templateUrl: './scpmdash.component.html',
  styleUrls: ['./scpmdash.component.css']
})
export class SCPMDashComponent {
  dashboardUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
'https://app.powerbi.com/reportEmbed?reportId=55dddfc1-f8ae-4fba-bb09-92f2972c535b&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'
);
  }

  navigateToPredictPage() {
    // Navigate to predict page with return path set to SCPM
    this.router.navigate(['/predict'], { queryParams: { returnTo: '/SCPM' } });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
