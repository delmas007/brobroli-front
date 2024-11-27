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
import {ProfileComponent} from "@auth/dashboard/settings/profile/profile.component";
import {ServiceComponent} from "@auth/dashboard/settings/service/service.component";
import {WalletComponent} from "@auth/dashboard/settings/wallet/wallet.component";
import {NotificationComponent} from "@auth/dashboard/settings/notification/notification.component";
import {SecurityComponent} from "@auth/dashboard/settings/security/security.component";
import {SidebarComponent} from "@auth/dashboard/settings/sidebar/sidebar.component";
import {ForgotPasswordComponent} from "@auth/forgot-password/forgot-password.component";
import {ResetPassawordComponent} from "@auth/reset-passaword/reset-passaword.component";
import {VerifyCodeComponent} from "@auth/verify-code/verify-code.component";
import { AdminValidateComponent } from './presentation/components/shared/admin-validate/admin-validate.component';
import {AdminPublierComponent} from "@shared/admin-publier/admin-publier.component";
import {NotAuthorizedComponent} from "@pages/not-authorized/not-authorized.component";
import {SessionComponent} from "@pages/session/session.component";
import {AuthenticationGuard} from "@guards/authentication.guard";
import {AuthorizationGuard_SCOPE_PROVIDER} from "@guards/authorization-provider.guard";
import {AuthorizationGuard_SCOPE_CUSTOMER} from "@guards/authorization-customer.guard";
import {AuthorizationGuard_SCOPE_ADMIN} from "@guards/authorization-admin.guard";
export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPassawordComponent},
    { path: 'verify-code', component:  VerifyCodeComponent},
    { path: 'add-service', component: ServicesPageComponent,canActivate:[AuthenticationGuard,AuthorizationGuard_SCOPE_PROVIDER] },
    { path: 'dashboard-client', component: ClientDashboardComponent,canActivate:[AuthenticationGuard,AuthorizationGuard_SCOPE_CUSTOMER]},
    { path: 'dashboard-prestataire', component: PrestataireDashboardComponent,canActivate:[AuthenticationGuard,AuthorizationGuard_SCOPE_PROVIDER]},
    { path: 'register', component: RegisterComponent },
    { path: 'settings', component: SettingsComponent },
    { path: "notAuthorized", component: NotAuthorizedComponent },
    { path: "sessionExpired", component: SessionComponent },
    { path: 'sidebar', component: SidebarComponent,
      children:[
        { path: 'profiles', component: ProfileComponent },
        { path: 'servises', component: ServiceComponent },
        { path: 'wallet', component: WalletComponent },
        { path: 'notifications', component: NotificationComponent },
        { path: 'security', component: SecurityComponent },
      ]
    },

    { path: 'search/:typeService/:minPrice/:maxPrice', component: SearchComponent },
    { path: 'final-registration', component: FinalRegistrationComponent,canActivate:[AuthenticationGuard] },
    { path: 'profile/:id', component: CollabProfileComponent,canActivate:[AuthenticationGuard] },
    { path: 'projects-customer', component: ProjectsCustomerComponent,canActivate:[AuthenticationGuard,AuthorizationGuard_SCOPE_CUSTOMER] },
    { path: 'projects-provider', component: ProjectsProviderComponent,canActivate:[AuthenticationGuard,AuthorizationGuard_SCOPE_PROVIDER] },
    { path: 'terms-and-conditions', component: UsageConditionComponent },
    { path: 'add-competence', component: SkillsAddComponent ,canActivate:[AuthenticationGuard,AuthorizationGuard_SCOPE_PROVIDER]},

    { path:'admin', component: AdminDashComponent,canActivate:[AuthenticationGuard],
      children:[
        { path: '', redirectTo: 'accueil', pathMatch: 'full' },
        { path: 'accueil', component: AdminAccueilComponent,canActivate:[AuthorizationGuard_SCOPE_ADMIN] },
        { path: 'services/attente', component: AdminValidateComponent,canActivate:[AuthorizationGuard_SCOPE_ADMIN] },
        { path: 'services/publier', component: AdminPublierComponent,canActivate:[AuthorizationGuard_SCOPE_ADMIN] },
        { path: 'customers', component: AdminCustomersComponent,canActivate:[AuthorizationGuard_SCOPE_ADMIN] },
        { path: 'providers', component: AdminProvidersComponent,canActivate:[AuthorizationGuard_SCOPE_ADMIN] },
        { path: 'settings', component: AdminSettingsComponent,canActivate:[AuthorizationGuard_SCOPE_ADMIN] },

      ]
    },
    { path: '**', component: PageNotFoundComponent }

];
