import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {combineLatest, debounceTime, take} from 'rxjs';
import {User} from 'src/app/shared/models/shared.interfaces';
import {SharedService} from 'src/app/shared/services/shared.service';
import {SubSink} from 'subsink';
import {FormControl, FormGroup} from "@angular/forms";
import * as _ from "lodash";
import {latLng, marker, tileLayer} from "leaflet";


export interface UserForm {
  // id: FormControl<string | null>;
  name: FormControl<string | null>;
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  address: FormControl<any>;
  phone: FormControl<string | null>;
  website: FormControl<string | null>;
  company: FormControl<any>;
}

export interface ConstructorFormFields {
  value: string,
  type: FormFieldsType
}

type  FormFieldsType = 'string' | 'object';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User | undefined;
  private subs = new SubSink();
  formUser: FormGroup<UserForm> = new FormGroup<UserForm>({
    // id: new FormControl<string>(''),
    name: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    email: new FormControl<string>(''),
    company: new FormControl<string>(''),
    address: new FormControl<string>(''),
    username: new FormControl<string>(''),
    website: new FormControl<string>(''),
  });

  infoUser: ConstructorFormFields[] = [];
  loadMap = false;

  constructor(private sharedServices: SharedService, private routerActive: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private loadFormGroupUser() {

    Object.keys(this.user as User).filter(field => field != 'id').forEach(k => {
      const userValues: { [k: string]: any } = this.user as User;


      if (typeof userValues[k] != "object") {
        this.formUser.get(k as string)?.setValue(userValues[k]);
        this.infoUser.push({value: k, type: 'string'});

      } else {

        this.formUser.get(k as string)?.setValue(this.onlyForObjectValue(userValues[k]));
        this.infoUser.push({value: k, type: 'object'});
      }
    });

    //   map
    console.log(parseFloat(this.user?.address?.geo?.lng || '0'))

    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18}),
        marker([   parseFloat(this.user?.address?.geo?.lat || '0'), parseFloat(this.user?.address?.geo?.lng || '0')  ])
      ],
      zoom: 8,
      center: latLng(  parseFloat(this.user?.address?.geo?.lat || '0'), parseFloat(this.user?.address?.geo?.lng || '0'), )
    };
    this.loadMap= true;

  }

  onlyForObjectValue(value: { [k: string]: any }) {

    const ik = Object.keys(value).map(v => {

      if ( typeof value[v] == 'object') return ;

      let fieldValue = '';
      if ( value && value[v] ) {
        fieldValue = ' ' + value[v] + ' ';

      }
      return fieldValue.split(' , ');
    });

    return ik;

  }

  options = {

  };

  ngOnInit(): void {

    this.subs.add(
      combineLatest([this.sharedServices.getUsers(), this.routerActive.paramMap]).pipe(debounceTime(50), take(1)).subscribe(res => {

        this.user = res[0].find(user => res[1] && (user.id.toString() == (res[1].get('id')?.toString() || ''))) || undefined;
        if (this.user) {
          this.loadFormGroupUser();


        }

        console.log('user', this.formUser);

      })
    )

  }

  back() {
    window.history.back();
  }

}
