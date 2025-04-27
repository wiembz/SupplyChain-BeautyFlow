import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <div class="alert alert-danger">
      <h4>Accès refusé</h4>
      <p *ngIf="requiredRoles">
        Vous devez avoir le rôle: {{ requiredRoles }}
      </p>
    </div>
  `
})
export class AccessDeniedComponent {
  requiredRoles: string;

  constructor(private route: ActivatedRoute) {
    this.requiredRoles = this.route.snapshot.queryParams['required'];
  }
}