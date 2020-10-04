import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../_services/alert.service';
import { ProductService } from '../product.service';
import { CommunicationService } from 'src/app/_services/communication.service';
import { CustomValidation } from '../../../_validators/custom-validation';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from '../../../_services/message.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import { StarRatingComponent } from 'ng-starrating';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId = '';
  productData = [];
  myThumbnail: any;
  myFullresImage: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  galleryImageArr = [];
  data:any = '';
  constructor(private _product: ProductService, private _comm: CommunicationService,
    private router: Router, private route: ActivatedRoute, private alert: AlertService,
    private fb: FormBuilder, public translate: TranslateService, private _messageService: MessageService) {
    this.route.params.subscribe(param => {
      if (param.id && param) {
        this.productId = param.id;
        if (this.productId) {
          this.getProductDetail();
        }
      }
    });
  }

  ngOnInit(): void {
    this._messageService.changeMessage("Catalog");
    this.galleryOptions = [
      {
        width: '250px',
        height: '200px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        previewCloseOnClick:true
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

  }
  getProductDetail() {
    this._comm.notifyShowHideLoader({ show: true });
    this._product.getProductDetails(this.productId).subscribe(res => {
      let resp = res;
      if (resp) {
        this.data = resp;
        this.productData = JSON.parse(JSON.stringify(res));
        this.myThumbnail = this.productData['image_file']
        this.myFullresImage = this.productData['image_file']
        if(this.productData['image_file'])
        {
          this.galleryImageArr.push({'small': this.productData['image_file'],'medium':this.productData['image_file'],'big':this.productData['image_file']});
       
        }
        if(this.productData['additional_images'])
        {
          this.productData['additional_images'].forEach(element => {
            this.galleryImageArr.push({'small': element.image_file_thumb,'medium':element.image_file,'big':element.image_file});
          });
        }
        this.galleryImages = this.galleryImageArr;
        
        this._comm.notifyShowHideLoader({ show: false });
      }
    }, error => {
      this._comm.notifyShowHideLoader({ show: false });
      const msg = (error && error['error_description'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorEnquiryDetailFetching');
      this.alert.error('Error', msg);
    });

  }

}
