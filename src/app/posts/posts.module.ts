import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { DashboardPostsComponent } from './components/dashboard-posts/dashboard-posts.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ViewPostsComponent } from './components/view-posts/view-posts.component';



@NgModule({
  declarations: [
    DashboardPostsComponent,
    ViewPostsComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PostsModule { }
