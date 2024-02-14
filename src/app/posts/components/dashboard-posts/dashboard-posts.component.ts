import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { SubSink } from 'subsink';
import { combineLatest, debounceTime, forkJoin, take } from 'rxjs';
import { Post, TypeViewsPost, User, ValueTypeViewPost } from 'src/app/shared/models/shared.interfaces';
import { MatButtonToggleChange } from '@angular/material/button-toggle';



@Component({
  selector: 'app-dashboard-posts',
  templateUrl: './dashboard-posts.component.html',
  styleUrls: ['./dashboard-posts.component.scss']
})
export class DashboardPostsComponent implements OnInit, OnDestroy {
  private sub = new SubSink();
  posts: Post[] = [];
  users: User[] = [];
  valueType: ValueTypeViewPost = 'column';

  arrayTypeView: TypeViewsPost[] = [{ value: 'column', name: 'Lista', icon: 'view_list' },
  { value: 'wrap', name: 'Griglia', icon: 'grid_view' }]

  constructor(private postService: PostService) { }
  ngOnInit(): void {
    this.sub.add(

      combineLatest([this.postService.getPosts(), this.postService.getUsers()]).pipe(debounceTime(50), take(1)).subscribe(data => {

        this.posts = data[0];
        this.users = data[1];

      })


    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  viewChange(view: MatButtonToggleChange) {

  }

}
