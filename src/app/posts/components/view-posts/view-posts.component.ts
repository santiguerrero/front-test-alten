import { Component, Input } from '@angular/core';
import { Post, User, ValueTypeViewPost } from 'src/app/shared/models/shared.interfaces';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss']
})
export class ViewPostsComponent {

  @Input() posts!: Post[];
  @Input() users!: User[];
  @Input() view!: ValueTypeViewPost;

  showUser(post: Post): User | undefined {
    return this.users.find(user => user.id == post.userId) || undefined 
  }


  

}
