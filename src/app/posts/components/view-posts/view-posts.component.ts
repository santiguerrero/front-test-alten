import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogInfoComponent } from 'src/app/shared/components/dialog-info/dialog-info.component';
import { DataDialog, Post, User, ValueTypeViewPost } from 'src/app/shared/models/shared.interfaces';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateY(10px)' }),
            animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
        transition(':leave', [
            animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
        ]),
    ])
],
})
export class ViewPostsComponent {
  constructor(private dialogService: MatDialog) {}

  @Input() posts!: Post[];
  @Input() users!: User[];
  @Input() view!: ValueTypeViewPost;

  showUser(post: Post): User | undefined {
    return this.users.find(user => user.id == post.userId) || undefined 
  }

  openModalInfoPost(post: Post) {

    this.dialogService.open<DialogInfoComponent, any, any >( DialogInfoComponent , {
      width: '100%',
      height: 'auto',
      data: { titlePost: post.title, bodyPost: post.body, user: this.showUser(post) }
    });

  }


  

}
