import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { AlertService } from 'src/app/_services/alert.service';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CustomValidation } from 'src/app/_validators/custom-validation';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
import { CommunicationService } from 'src/app/_services/communication.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { ConstantService } from 'src/app/_services/constant.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {AccountService} from 'src/app/_services/account.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  matcher = new ValidationClassStateMatcher();
  dataForm: FormGroup;
  productId: any;
  profileImageText = "AddImage";
  additionalImageText = "AddImage";
  videoImageText = "AddVideo";
  maxHeightWidth = 2000;
  minHeightWidth = 700;
  imageError = null;
  videoimageError = null;
  additionalimageError = null;
  uploadFileName: any;
  selectFile: any;
  videoFile: any;
  additionalImageFiles:any =[];
  additionalLength = 0;
  imgPreview:any='assets/images/avtar-image.png';
  videoPreview:any='';
  videoPreviewImage:any='assets/images/avtar-image.png';
  productStatus:any = '';
  infostatus:any;
  constructor(private fb: FormBuilder, private _constant: ConstantService,public _account: AccountService, private getData: ProductService, private _comm: CommunicationService, private _alrt: AlertService, 
    private router: Router, private route: ActivatedRoute, 
    private _auth: AuthenticationService, public translate: TranslateService,
    public sanitizer: DomSanitizer
    ) {
    this.route.params.subscribe(params => {
      if (params) {
        this.productId = params.id;
        this.getDetails();
        this.getProductStatus(this.productId);
      }
    });

  }
  ngOnInit(): void {
  }
  getDetails() {
    if (this.productId) {
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.getGalleryDetails(this.productId).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          var resp = res;
          if(resp)
          {
            this.imgPreview = resp['image_file_thumb'];
            this.videoPreview = resp['video_file'];
            this.additionalImageFiles = resp['additional_images'];
            this.additionalLength = this.additionalImageFiles.length;
            if(resp['image_file_thumb'])
            {
              this.profileImageText = "ChangeImage";
            }
            if(resp['video_file'])
            {
              this.videoImageText = "ChangeVideo"
            }
          }
        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
      });
    }
  }
  fileChange(event) {
    this.imageError = null;
    var allowedImages = 'jpg,jpeg,png';
    var fileSizeLimit = 2097152; // 2MB
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const ext = file.type.split('/').pop();
      let status = true;
      if (allowedImages.indexOf(ext) === -1) {
        status = false;
        this.imageError = this.translate.instant('errorMessage.invalidFile');
      }
      if (file.size > fileSizeLimit) {
        status = false;
        this.imageError = this.translate.instant('errorMessage.fileSize');
      }
      if (status) {
        this._comm.notifyShowHideLoader({ show: true });
        /* image diemension validation */
        var img = new Image();
        img.src = window.URL.createObjectURL(file);
        const that = this;
        img.onload = function () {
          console.log(img.naturalWidth);
          console.log(img.naturalHeight);
          if (img.naturalWidth > that.maxHeightWidth || img.naturalHeight > that.maxHeightWidth || img.naturalHeight < that.minHeightWidth || img.naturalWidth < that.minHeightWidth) {
            that._comm.notifyShowHideLoader({ show: false });
            that.imageError = that.translate.instant('errorMessage.ProductImageDimension');
            //that.profileForm.get('image_url').setValidators([Validators.required]);
            return;
          } else {
            that._comm.notifyShowHideLoader({ show: false });
            that.selectFile = file;
            if(that.selectFile)
            {
              that.addProfileImage(that.selectFile);
            }
            that.imgPreview = that.sanitizer.bypassSecurityTrustResourceUrl(
              img.src
            );
            that.profileImageText = "ChangeImage";

          }
        }
      }
    } else {
      this.imageError = this.translate.instant('errorMessage.PleaseSelectImage');
    }
  }
  additionalChange(event) {
    this.additionalimageError = null;
    var allowedImages = 'jpg,jpeg,png';
    var fileSizeLimit = 2097152; // 2MB
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const ext = file.type.split('/').pop();
      let status = true;
      if (allowedImages.indexOf(ext) === -1) {
        status = false;
        this.additionalimageError = this.translate.instant('errorMessage.invalidFile');
      }
      if (file.size > fileSizeLimit) {
        status = false;
        this.additionalimageError = this.translate.instant('errorMessage.fileSize');
      }
      if (status) {
        this._comm.notifyShowHideLoader({ show: true });
        /* image diemension validation */
        var img = new Image();
        img.src = window.URL.createObjectURL(file);
        const that = this;
        img.onload = function () {
          if (img.naturalWidth > that.maxHeightWidth || img.naturalHeight > that.maxHeightWidth || img.naturalHeight < that.minHeightWidth || img.naturalWidth < that.minHeightWidth) {
            that._comm.notifyShowHideLoader({ show: false });
            that.additionalimageError = that.translate.instant('errorMessage.ProductImageDimension');
            //that.profileForm.get('image_url').setValidators([Validators.required]);
            return;
          } else {
            that._comm.notifyShowHideLoader({ show: false });
            that.selectFile = file;
            if(that.selectFile)
            {
              that.addAdditionalImage(that.selectFile);
            }
            that.imgPreview = that.sanitizer.bypassSecurityTrustResourceUrl(
              img.src
            );
            //that.additionalImageText = "ChangeImage";

          }
        }
      }
    } else {
      this.additionalimageError =  this.translate.instant('errorMessage.PleaseSelectImage');
    }
  }
  videofileChange(event) {
    this.videoimageError = null;
    var allowedImages = 'mp4,avi,mkv';
    var fileSizeLimit = 20097152; // 2MB
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const ext = file.type.split('/').pop();
      let status = true;
      if (allowedImages.indexOf(ext) === -1) {
        status = false;
        this.videoimageError = this.translate.instant('errorMessage.invalidFile');
      }
      if (file.size > fileSizeLimit) {
        status = false;
        this.videoimageError = this.translate.instant('errorMessage.videoFileSize');
      }
      if (status) {
        this._comm.notifyShowHideLoader({ show: true });
        /* image diemension validation */
        if(file)
        {
          this.videoFile = file;
          if(this.videoFile)
          {
            this.addVideo(this.videoFile);
            this.videoImageText = "ChangeVideo";
          }
        }
      }
    } else {
      this.videoimageError = this.translate.instant('errorMessage.gallerySuccessfullyUpdate');
    }
  }

  addProfileImage(file) {
    if (file) {
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.updateProductImage(this.productId,file).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.gallerySuccessfullyUpdate');
        this._alrt.success('Success', msg);
        //this.router.navigate(['/factory/product/general-information/',this.productId]);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorOccuredDuringGallery');
        this._alrt.error('Error', msg);
      });
    }

  }
  addAdditionalImage(file) {
    if (file) {
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.updateAdditionalProductImage(this.productId,file).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.gallerySuccessfullyUpdate');
        this._alrt.success('Success', msg);
        this.getDetails();
        //this.router.navigate(['/factory/product/general-information/',this.productId]);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorOccuredDuringGallery');
        this._alrt.error('Error', msg);
      });
    }

  }
  addVideo(file) {
    if (file) {
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.updateVideo(this.productId,file).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.gallerySuccessfullyUpdate');
        this._alrt.success('Success', msg);
        this.getDetails();
        //this.router.navigate(['/factory/product/general-information/',this.productId]);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.errorOccuredDuringGallery');
        this._alrt.error('Error', msg);
      });
    }

  }
  removeImage(id) {
    if (id) {
      this._comm.notifyShowHideLoader({ show: true });
      this.getData.removeImage(id).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (res && res['message']) ? res['message'] : this.translate.instant('errorMessage.removeSuccessfully');
        this._alrt.success('Success', msg);
        this.getDetails();
        //this.router.navigate(['/factory/product/general-information/',this.productId]);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error'] && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.ErrorOccuredDuringRemoveImage');
        this._alrt.error('Error', msg);
      });
    }

  }
  getProductStatus(id) {
    if (this.productId) {
      this._account.getProductStatus(this.productId).subscribe(res => {
        if (res) {
          var resp = res;
          this.infostatus = resp['info_status'];
        }
      }, error => {
      });
    }
  }



}
