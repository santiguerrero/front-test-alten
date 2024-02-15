import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { catchError, combineLatest, debounceTime, distinctUntilChanged, fromEvent, map, take, throwError } from 'rxjs';
import { Post, TypeViewsPost, User, ValueTypeViewPost, viewTypeMemory } from 'src/app/shared/models/shared.interfaces';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import * as _ from 'lodash';
import { SharedService } from 'src/app/shared/services/shared.service';



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
  loadingBar = false;
  valueType!: ValueTypeViewPost;
  arrayTypeView: TypeViewsPost[] = [{ value: 'column', name: 'Lista', icon: 'view_list' },
  { value: 'wrap', name: 'Griglia', icon: 'grid_view' }];
  @ViewChild('searchpostsFiltered') searchPosts!: ElementRef;


  get valueTypeModel() {
    return this.valueType;
  }

  set valueTypeModel(v: ValueTypeViewPost) {
    this.valueType = v;
    // trick to reload animation
    this.postsFiltered = _.cloneDeep(this.posts);

    // set to localStorage :)
    localStorage.setItem(viewTypeMemory, this.valueType);

  }


  constructor(private sharedServices: SharedService) { }
  ngAfterViewInit(): void {

    fromEvent(this.searchPosts.nativeElement, 'keyup').pipe(
      map((d: any) => {
        if (d.target.value.length > 1) {
          this.loadingBar = true;
          return d.target.value;
        }
        this.loadingBar = false;
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

    this.loadingBar = false;
  }
  ngOnInit(): void {

    this.loadingBar = true;
    this.valueType = (localStorage.getItem(viewTypeMemory) as ValueTypeViewPost | null) || 'column';
    this.sub.add(

      combineLatest([this.sharedServices.getPosts(), this.sharedServices.getUsers()]).pipe(debounceTime(50), take(1), catchError(err => {
        this.loadingBar = false;
        return throwError(() => err);
      })).subscribe(data => {

        this.posts = data[0];
        this.postsFiltered = data[0];
        this.users = data[1];
        this.loadingBar = false;

      })

    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
