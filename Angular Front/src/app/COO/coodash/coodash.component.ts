import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-coodash',
  templateUrl: './coodash.component.html',
  styleUrls: ['./coodash.component.css']
})
export class COODashComponent implements OnInit {
  dashboardUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private authService: AuthService
  ) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.powerbi.com/reportEmbed?reportId=2898bad5-3d33-4125-ab85-e30f0aaaa67d&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&navContentPaneEnabled=false&filterPaneEnabled=false'
    );
  }

  ngOnInit(): void {
  }

  navigateToPrediction(): void {
    this.router.navigate(['/serie']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
