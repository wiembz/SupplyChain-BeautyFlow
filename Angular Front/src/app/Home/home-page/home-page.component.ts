import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  dashboardUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer ,private authService: AuthService ,  private router: Router,) {
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.powerbi.com/reportEmbed?reportId=bd78eaa3-f6c5-4897-b4d5-9f18ec186e86&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&pageName=ReportSection4a09280d221014721dd1&navContentPaneEnabled=false&filterPaneEnabled=false'
    );
  }  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }  
}
