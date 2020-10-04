import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MessageService } from '../../../_services/message.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<void>();
  userDetailsLogin: any;
  imageUrl:any;
  path: string;
  title: string;
  name:string;
  constructor(private readonly router: Router,private route: ActivatedRoute, public translate: TranslateService, private _auth: AuthenticationService, private _messageService: MessageService) {}

  ngOnInit() {
    this.userDetailsLogin = this._auth.getLoginUserDetails();
    if (this.userDetailsLogin.lang) {
      this.translate.use(this.userDetailsLogin.lang);
    }else
    {
      this.translate.use('en');
    }
    if(this.userDetailsLogin)
    {
      let profileData = this.userDetailsLogin;
      this.imageUrl = profileData.image_file;
      this.name = ((profileData.first_name == null) ? '' : profileData.first_name) + ' ' + ((profileData.last_name == null) ? '' : profileData.last_name);
    }
    this._messageService.currentMessage.subscribe(message => this.path = message);
    this._messageService.selectedProfile$.subscribe(profileData => {
      this.imageUrl = profileData.image_file;
      this.name = ((profileData.first_name == null) ? '' : profileData.first_name) + ' ' + ((profileData.last_name == null) ? '' : profileData.last_name);
      // this.name = (profileData.first_name == null) ? '': profileData.first_name+' '+ (profileData.last_name == null) ? '': profileData.last_name;
    });
    
    this.title = this.route.firstChild.snapshot.data.text; 
  }

  toggleSidebar() {

    this.sideNavToggled.emit();
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/login']);
  }
}
