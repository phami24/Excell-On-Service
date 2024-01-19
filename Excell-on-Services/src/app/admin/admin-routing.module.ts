import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './feature/main/main.component';
import { CustomerManagementComponent } from './feature/customer-management/customer-management.component';
import { AuthAdminGuard } from '../Guard/admin.guard';
import { DepartmentComponent } from './feature/department/department.component';
import { EmployeeComponent } from './feature/employee/employee.component';
import { ServicesComponent } from './feature/services/services.component';
import { CommentsComponent } from './feature/comments/comments.component';
import { ProfileAdminComponent } from './feature/profile-admin/profile-admin.component';



const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'main',
        component: MainComponent,canActivate: [AuthAdminGuard] ,
        data: { title: 'Main' },
      },
      {
        path: 'customer',
        component: CustomerManagementComponent,
        data: { title: 'Customer management' },
      },
      {
        path: 'department',
        component: DepartmentComponent,
        data: { title: 'Department' },
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        data: { title: 'Employee' },
      },
      {
        path: 'services',
        component: ServicesComponent,
        data: { title: 'Services' },
      },
      {
        path: 'comments',
        component: CommentsComponent,
        data: { title: 'Comments' },
      },
      {
        path: 'profile-admin',
        component: ProfileAdminComponent,
        data: { title: 'Profile Admin' },
      }
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
