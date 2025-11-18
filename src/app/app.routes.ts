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

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'uesr-profile', component: UserProductComponent },
    { path: 'contact-us', component: ContactUsComponent },
    //admin
    {
        path: '', children: [
            { path: 'admin', component: AdminLoginComponent }
        ]
    },
    {
        path: '', children: [
            { path: 'admin-dashboard', component: AdminDashboardComponent },
            { path: 'admin/crud', component: AdminCrudComponent },
            { path: 'admin/product', component: ProductComponent }
        ]
    },
    {
        path: '', children: [
            { path: 'sign-in', component: SigninUpComponent },
            { path: 'sign-up', component: SigninUpComponent }
        ]
    },
    {
        path: '', children: [
            { path: 'seller-dashboard', component: SellerDashboardComponent },
            { path: 'seller/product', component: ProductComponent }
        ]
    },
    {
        path: '', children: [
            { path: 'buyer-dashboard', component: BuyerDashboarComponent },
            { path: 'checkout', component: CheckoutComponent }
        ]
    },
    { path: '**', component: PageNotFoundComponent }

];
