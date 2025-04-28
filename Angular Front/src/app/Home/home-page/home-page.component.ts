import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  dashboardUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer,private router: Router,
      private authService: AuthService) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.powerbi.com/reportEmbed?reportId=bd78eaa3-f6c5-4897-b4d5-9f18ec186e86&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&pageName=ReportSection4a09280d221014721dd1&navContentPaneEnabled=false&filterPaneEnabled=false'
    );
  }

  ngOnInit(): void {
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToAddDecieurs(): void {
    this.router.navigate(['/addDecieurs']);
  }
}
