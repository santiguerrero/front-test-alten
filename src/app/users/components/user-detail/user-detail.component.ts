import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, debounceTime, take } from 'rxjs';
import { User } from 'src/app/shared/models/shared.interfaces';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User | undefined;
  private subs = new SubSink();

  constructor(private sharedServices: SharedService, private routerActive: ActivatedRoute) {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {

    this.subs.add(

      combineLatest([ this.sharedServices.getUsers() , this.routerActive.paramMap ]).pipe(debounceTime(50), take(1)).subscribe(res => {

        this.user = res[0].find(user => res[1] && (user.id.toString() == (res[1].get('id')?.toString() || '')) ) || undefined;
        console.log('user', this.user);
        
      })
    )
    
  }

}
