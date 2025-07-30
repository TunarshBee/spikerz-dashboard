import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RemediationTechniquesComponent } from './pages/remediation-techniques/remediation-techniques.component';

export const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'remediation', component: RemediationTechniquesComponent }
];
