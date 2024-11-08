import { Routes } from '@angular/router';
import {LoginComponent} from '@auth/login/login.component';
import {PageNotFoundComponent} from '@pages/page-not-found-component/page-not-found-component.component';
import { HomeComponent } from '@pages/home/home.component';
import { ClientDashboardComponent } from '@auth/dashboard/client-dashboard/client-dashboard.component';
import { PrestataireDashboardComponent } from '@auth/dashboard/prestataire-dashboard/prestataire-dashboard.component';
import {RegisterComponent} from '@auth/register/register.component';
import { SettingsComponent } from '@auth/dashboard/settings/settings.component';
import { SearchComponent } from '@pages/search/search.component';
import { FinalRegistrationComponent } from '@auth/final-registration/final-registration.component';
import { CollabProfileComponent } from '@pages/collab-profile/collab-profile.component';
import { ProjectsCustomerComponent } from '@auth/dashboard/projects/project-customer/projects.component';
import { ProjectsProviderComponent } from '@auth/dashboard/projects/project-provider/projects.component';
import { UsageConditionComponent } from '@pages/usage-condition/usage-condition.component';
import { ServicesPageComponent } from '@pages/services-page/services-page.component';
import { SkillsAddComponent} from '@auth/dashboard/prestataire-dashboard/skills-add/skills-add.component';
import { AdminDashComponent } from '@layout/admin-dash/admin-dash.component';
import { AdminAccueilComponent } from './presentation/components/shared/admin-accueil/admin-accueil.component';
import { AdminCustomersComponent } from './presentation/components/shared/admin-customers/admin-customers.component';
import { AdminProvidersComponent } from './presentation/components/shared/admin-providers/admin-providers.component';
import { AdminSettingsComponent } from './presentation/components/shared/admin-settings/admin-settings.component';
import {ForgotPasswordComponent} from "@auth/forgot-password/forgot-password.component";
import {ResetPassawordComponent} from "@auth/reset-passaword/reset-passaword.component";
import {VerifyCodeComponent} from "@auth/verify-code/verify-code.component";
export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPassawordComponent},
    { path: 'verify-code', component:  VerifyCodeComponent},
    { path: 'add-service', component: ServicesPageComponent },
    { path: 'dashboard-client', component: ClientDashboardComponent},
    { path: 'dashboard-prestataire', component: PrestataireDashboardComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'search/:typeService/:minPrice/:maxPrice', component: SearchComponent },
    { path: 'final-registration', component: FinalRegistrationComponent },
    { path: 'profile', component: CollabProfileComponent },
    { path: 'projects-customer', component: ProjectsCustomerComponent },
    { path: 'projects-provider', component: ProjectsProviderComponent },
    { path: 'terms-and-conditions', component: UsageConditionComponent },
    { path: 'add-competence', component: SkillsAddComponent },

    { path:'delmas', component: AdminDashComponent,
      children:[
        { path: '', redirectTo: 'accueil', pathMatch: 'full' },
        { path: 'accueil', component: AdminAccueilComponent },
        { path: 'customers', component: AdminCustomersComponent },
        { path: 'providers', component: AdminProvidersComponent },
        { path: 'settings', component: AdminSettingsComponent },

      ]
    },
    { path: '**', component: PageNotFoundComponent }

];
