import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UserDetailComponent} from './components/user-detail/user-detail.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from "@angular/forms";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";


@NgModule({
  declarations: [
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    LeafletModule
  ]
})
export class UsersModule {
}
