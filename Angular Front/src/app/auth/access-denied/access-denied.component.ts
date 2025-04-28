import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements AfterViewInit {
  requiredRoles: string;
  selectedMessage: string;
  
  // Possible role names for friendly display
  private roleMap: { [key: string]: string } = {
    'ADMIN': 'Administrator',
    'USER': 'Regular User',
    'CPO': 'Chief Product Officer',
    'SCPM': 'Supply Chain Process Manager',
    'COO': 'Chief Operating Officer',
    'LM': 'Logistics Manager',
    'PM': 'Procurement Manager',
    'superviseur': 'Supervisor',
  };

  // Dynamic funny messages for access denied
  private funnyMessages: string[] = [
    "Sorry, this area is for VIP beauty managers only!",
    "Access denied: This beauty station requires special clearance.",
    "Oops! You need additional permissions to enter this beauty zone.",
    "Your beauty level is not high enough for this area yet.",
    "This section is undergoing a beauty makeover - check back later!"
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.requiredRoles = this.route.snapshot.queryParams['required'] || '';
    // Select a random message on component creation
    this.selectedMessage = this.getRandomMessage();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupEyeMovement();
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.updateEyePosition);
  }

  getTitle(): string {
    return "Access Denied";
  }

  getMessage(): string {
    if (!this.requiredRoles) {
      return this.selectedMessage;
    }
    
    const roles = this.requiredRoles.split(',');
    const friendlyRoles = roles.map(role => this.roleMap[role.trim()] || role.trim()).join(' or ');
    
    return `${this.selectedMessage} (Requires ${friendlyRoles} privileges)`;
  }

  private getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.funnyMessages.length);
    return this.funnyMessages[randomIndex];
  }

  showLoginOption(): boolean {
    // Show login option if user is not authenticated
    return !this.authService.isLoggedIn();
  }

  private setupEyeMovement(): void {
    const root = document.documentElement;
    const eyef = document.getElementById('eyef');
    
    if (!eyef) return;

    // Set initial values
    root.style.setProperty("--mouse-x", "0.5");
    root.style.setProperty("--mouse-y", "0.5");

    document.addEventListener("mousemove", this.updateEyePosition);

    document.addEventListener("touchmove", (touchHandler: TouchEvent) => {
      let x = touchHandler.touches[0].clientX / window.innerWidth;
      let y = touchHandler.touches[0].clientY / window.innerHeight;

      root.style.setProperty("--mouse-x", x.toString());
      root.style.setProperty("--mouse-y", y.toString());
    });
  }

  private updateEyePosition(e: MouseEvent): void {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x', x.toString());
    document.documentElement.style.setProperty('--mouse-y', y.toString());
  }
}