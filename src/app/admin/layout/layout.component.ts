import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/_services/communication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  sideNavOpened = true;
  sideNavMode: 'side' | 'over' = 'side';
  //toolBarHeight = 64;
  showLoader = false;
  private readonly mediaWatcher: Subscription;
  constructor(media: MediaObserver,private _comm: CommunicationService,) {
    this.mediaWatcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        if (this.sideNavOpened) {
          this.sideNavOpened = false;
        }
        this.sideNavMode = 'over';
      } else {
        this.sideNavOpened = true;
        this.sideNavMode = 'side';
      }
      if (change.mqAlias === 'xs') {
        //this.toolBarHeight = 56;
      } else {
        //this.toolBarHeight = 64;
      }
    });
  }
  ngOnInit() {
    this._comm.showLoaderObservable$.subscribe(res => {
      if (res) {
        this.showLoader = res.show;
        /*if (this.changeDetectorRef && !this.changeDetectorRef['destroyed']) {
          this.changeDetectorRef.detectChanges();
        }*/
      }
    });
   }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }
}
