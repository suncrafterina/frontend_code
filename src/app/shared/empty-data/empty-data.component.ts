import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss']
})
export class EmptyDataComponent implements OnInit {
  @Input() fetchedRecords: number = 1;
  emptyText:any;
  constructor(public translate: TranslateService)
  {
    this.emptyText = this.translate.instant('errorMessage.emptyData');
  }

  ngOnInit() {}

}
