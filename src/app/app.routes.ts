import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserProductComponent } from './user-product/user-product.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminCrudComponent } from './admin/admin-crud/admin-crud.component';
import { ProductComponent } from './product/product.component';
import { SigninUpComponent } from './customer/signin-up/signin-up.component';
import { SellerDashboardComponent } from './customer/seller/seller-dashboard/seller-dashboard.component';
import { BuyerDashboarComponent } from './customer/buyer/buyer-dashboar/buyer-dashboar.component';
import { CheckoutComponent } from './customer/buyer/checkout/checkout.component';
import { PageNotFoundComponent } from './shared/layouts/page-not-found/page-not-found.component';
import {
    AdminAuthGuardLogin,
    AdminAuthGuardService,
    BuyerAuthGuardService,
    SellerAuthGuardService,
    SellerBuyerAuthGuardLogin
} from './shared/services/auth-guard.service';

// export const routes: Routes = [
//     { path: '', redirectTo: 'home', pathMatch: 'full' },
//     { path: 'home', component: HomeComponent },
//     { path: 'uesr-profile', component: UserProductComponent },
//     { path: 'contact-us', component: ContactUsComponent },
//     //admin
//     {
//         path: '', canActivate: [AdminAuthGuardLogin], children: [
//             { path: 'admin-login', component: AdminLoginComponent }
//         ]
//     },
//     {
//         path: '', canActivate: [AdminAuthGuardService], children: [
//             { path: 'admin-dashboard', component: AdminDashboardComponent },
//             { path: 'admin/crud', component: AdminCrudComponent },
//             { path: 'admin/product', component: ProductComponent }
//         ]
//     },
//     //login and signup
//     {
//         path: '', canActivate: [SellerBuyerAuthGuardLogin], children: [
//             { path: 'sign-in', component: SigninUpComponent },
//             { path: 'sign-up', component: SigninUpComponent }
//         ]
//     },
//     //seller
//     {
//         path: '', canActivate: [SellerAuthGuardService], children: [
//             { path: 'seller-dashboard', component: SellerDashboardComponent },
//             { path: 'seller/product', component: ProductComponent }
//         ]
//     },
//     //buyer
//     {
//         path: '', canActivate: [BuyerAuthGuardService], children: [
//             { path: 'buyer-dashboard', component: BuyerDashboarComponent },
//             { path: 'checkout', component: CheckoutComponent }
//         ]
//     },
//     { path: '**', component: PageNotFoundComponent }

// ];
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: UserProductComponent },
  { path: 'contact-us', component: ContactUsComponent },

  // Admin before login
  { path: 'admin-login', component: AdminLoginComponent, canActivate: [AdminAuthGuardLogin] },

  // Admin after login
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuardService] },
  { path: 'admin/crud', component: AdminCrudComponent, canActivate: [AdminAuthGuardService] },
  { path: 'admin/product', component: ProductComponent, canActivate: [AdminAuthGuardService] },

  // Buyer/Seller before login
  { path: 'sign-in', component: SigninUpComponent, canActivate: [SellerBuyerAuthGuardLogin] },
  { path: 'sign-up', component: SigninUpComponent, canActivate: [SellerBuyerAuthGuardLogin] },

  // Seller after login
  { path: 'seller-dashboard', component: SellerDashboardComponent, canActivate: [SellerAuthGuardService] },
  { path: 'seller/product', component: ProductComponent, canActivate: [SellerAuthGuardService] },

  // Buyer after login
  { path: 'buyer-dashboard', component: BuyerDashboarComponent, canActivate: [BuyerAuthGuardService] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [BuyerAuthGuardService] },

  // Page not found
  { path: '**', component: PageNotFoundComponent }
];

