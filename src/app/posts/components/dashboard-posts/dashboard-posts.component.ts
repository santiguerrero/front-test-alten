import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../services/post.service';
import { SubSink } from 'subsink';
import { combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, take } from 'rxjs';
import { Post, TypeViewsPost, User, ValueTypeViewPost } from 'src/app/shared/models/shared.interfaces';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import * as _ from 'lodash';



@Component({
  selector: 'app-dashboard-posts',
  templateUrl: './dashboard-posts.component.html',
  styleUrls: ['./dashboard-posts.component.scss']
})
export class DashboardPostsComponent implements OnInit, OnDestroy, AfterViewInit {
  private sub = new SubSink();
  posts: Post[] = [];
  postsFiltered: Post[] = [];
  users: User[] = [];
  valueType: ValueTypeViewPost = 'column';
  arrayTypeView: TypeViewsPost[] = [{ value: 'column', name: 'Lista', icon: 'view_list' },
  { value: 'wrap', name: 'Griglia', icon: 'grid_view' }];
  @ViewChild('searchpostsFiltered') searchPosts!: ElementRef;


  constructor(private postService: PostService) { }
  ngAfterViewInit(): void {

    fromEvent(this.searchPosts.nativeElement, 'keyup').pipe(
      map((d: any) => {
        if (d.target.value.length > 2) {

          return d.target.value;
        }

        return '';

      }),
      debounceTime(250),
      distinctUntilChanged()
    ).subscribe(text => {
      this.searchOnPost(text);
    })

  }

  searchOnPost(text: string) {
    if (!text) this.postsFiltered = _.cloneDeep(this.posts);

    this.postsFiltered = _.cloneDeep(this.posts.filter((post) =>
      post.title.toLowerCase().includes(text.toLowerCase()) || post.body.toLowerCase().includes(text.toLowerCase())
    ));
  }
  ngOnInit(): void {
    this.sub.add(

      combineLatest([this.postService.getPosts(), this.postService.getUsers()]).pipe(debounceTime(50), take(1)).subscribe(data => {

        this.posts = data[0];
        this.postsFiltered = data[0];
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
