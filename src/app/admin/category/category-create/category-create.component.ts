import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { AlertService } from 'src/app/_services/alert.service';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, FormArray, FormControl } from '@angular/forms';
import { CustomValidation } from 'src/app/_validators/custom-validation';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
import { CommunicationService } from 'src/app/_services/communication.service';
import { ValidationClassStateMatcher } from 'src/app/shared/classes/validation-class';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  matcher = new ValidationClassStateMatcher();
  categoryForm: FormGroup;
  categoryId: any;
  maxHeightWidth = 800;
  minHeightWidth = 100;
  imgPreview: SafeResourceUrl;
  imageError = null;
  existImage = null;
  uploadFileName: any;
  selectFile = null;
  companyImageText = "AddIcon";
  companyimageError=null;
  companySelectFile = null;
  companyimgPreview=null;
  categoryImageText ="AddImage"
  constructor(private fb: FormBuilder,public translate: TranslateService,public sanitizer: DomSanitizer, private _category: CategoryService, private _comm: CommunicationService, private _alrt: AlertService, private router: Router, private route: ActivatedRoute) {
    this.formInIt();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        setTimeout(() => {
          this.categoryId = params.id;
          if (this.categoryId) {
            this.getCategoryDetails()
          }
        })
      }
    });

  }

  ngOnInit(): void {

  }


  formInIt() {
    this.categoryForm = this.fb.group({
      title: ['', [Validators.required, CustomValidation.validateWhiteSpace, Validators.maxLength(100), Validators.minLength(3)]],
      // sorting_order: ['', [Validators.required, CustomValidation.validateWhiteSpace, CustomValidation.validateNumberRequired, CustomValidation.validateNumberRequired, CustomValidation.validateNumberIntegerRequired]],
      category_level: ['', [Validators.required]],
      parent_id: ['', [Validators.required]],
      image_file:[''],
      icon_file:['']
    });
    this.categoryForm.controls.category_level.setValue('LEVEL_ONE');
    this.categoryForm.controls.parent_id.setValue(0);
  }
  hasError(field: any) {
    return CustomValidation.hasError(this.categoryForm, field);
  }

  arrHasError(formObj: any, field: any) {
    return CustomValidation.hasError(formObj, field);
  }
  addCategory() {
    if (this.categoryForm.valid) {
      const postData = JSON.parse(JSON.stringify(this.categoryForm.value));
      this._comm.notifyShowHideLoader({ show: true });
      this._category.addCategory(postData,this.selectFile,this.companySelectFile).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (res && res['message']) ? res['message'] : this.translate.instant('Common.categoryAdd');
        this._alrt.success('Success', msg);
        this.router.navigate(["/admin/category/category-list"]);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.categoryErr');

        this._alrt.error('Error', msg);
      });
    }
  }
  getCategoryDetails() {
    if (this.categoryId) {
      this._comm.notifyShowHideLoader({ show: true });
      this._category.getCategoryDetails(this.categoryId).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        if (res) {
          var resp = res;
          resp['title'] = (resp['title']) ? resp['title'] : null;
          if (res['image_file']) {
            this.categoryForm.patchValue({ image_file: res['image_file'] });
            this.imgPreview = res['image_file'];
            this.existImage = res['image_file'].split('/').pop();
            this.categoryImageText = "ChangeImage";
          }
          if (res['icon_file']) {
            this.categoryForm.patchValue({ icon_file: res['icon_file'] });
            this.companyimgPreview = res['icon_file'];
            this.existImage = res['icon_file'].split('/').pop();
            this.companyImageText = "ChangeIcon";
          }
          // resp['sorting_order'] = (resp['sorting_order'] !== undefined) ? resp['sorting_order'] : null;
          this.categoryForm.patchValue(resp);

        }
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
      });
    }
  }
  updateCategory() {
    if (this.categoryForm.valid && this.categoryId) {
      const postData = JSON.parse(JSON.stringify(this.categoryForm.value));
      postData['id'] = this.categoryId;
      this._comm.notifyShowHideLoader({ show: true });
      this._category.updateCategory(postData,this.selectFile,this.companySelectFile).subscribe(res => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (res && res['message']) ? res['message'] : this.translate.instant('Common.categoryUpdate');
        this._alrt.success('Success', msg);
        this.router.navigate(["/admin/category/category-list"]);
      }, error => {
        this._comm.notifyShowHideLoader({ show: false });
        const msg = (error && error['error_description']) ? error['error_description'] : this.translate.instant('errorMessage.categoryErr');
        this._alrt.error('Error', msg);
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
        this.uploadFileName = new Date().getTime() + '_' + file.name.replace(/[^A-Z0-9.]/gi, '');
        /*if (this.profileForm.value['profileImage']) {
          this.uploadFileName = this.profileForm.value['profileImage'].split('/').pop();
        }*/
        this._comm.notifyShowHideLoader({ show: true });
        /* image diemension validation */
        var img = new Image();
        img.src = window.URL.createObjectURL(file);
        const that = this;
        img.onload = function () {
          if (img.naturalWidth > that.maxHeightWidth || img.naturalHeight > that.maxHeightWidth || img.naturalHeight < that.minHeightWidth || img.naturalWidth < that.minHeightWidth) {
            that._comm.notifyShowHideLoader({ show: false });
            that.imageError = that.translate.instant('errorMessage.ImageDimension');
            that.categoryForm.get('image_url').setValidators([Validators.required]);
            return;
          } else {
            that._comm.notifyShowHideLoader({ show: false });
            that.selectFile = file;
            that.imgPreview =  that.sanitizer.bypassSecurityTrustResourceUrl(
              img.src
            );
            
          }
        }
        /* image diemension validation */
        /*const myReader: FileReader = new FileReader();
        myReader.onload = function(loadEvent: any) {};
        myReader.readAsDataURL(file);
        this.uploadOnS3(event);*/
      }
    } else {
      this.imageError = this.translate.instant('errorMessage.PleaseSelectImage');
    }
  }
  /* image upload */
  fileChanges(event) {
    this.companyimageError = null;
    var allowedImages = 'jpg,jpeg,png';
    var fileSizeLimit = 2097152; // 2MB
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const ext = file.type.split('/').pop();
      let status = true;
      if (allowedImages.indexOf(ext) === -1) {
        status = false;
        this.companyimageError = this.translate.instant('errorMessage.invalidFile');
      }
      if (file.size > fileSizeLimit) {
        status = false;
        this.companyimageError = this.translate.instant('errorMessage.fileSize');
      }
      if (status) {
        this.uploadFileName = new Date().getTime() + '_' + file.name.replace(/[^A-Z0-9.]/gi, '');
        /*if (this.profileForm.value['profileImage']) {
          this.uploadFileName = this.profileForm.value['profileImage'].split('/').pop();
        }*/
        this._comm.notifyShowHideLoader({ show: true });
        /* image diemension validation */
        var companyLogoimg = new Image();
        companyLogoimg.src = window.URL.createObjectURL(file);
        const that = this;
        companyLogoimg.onload = function () {
          if (companyLogoimg.naturalWidth > that.maxHeightWidth || companyLogoimg.naturalHeight > that.maxHeightWidth || companyLogoimg.naturalHeight < that.minHeightWidth || companyLogoimg.naturalWidth < that.minHeightWidth) {
            that._comm.notifyShowHideLoader({ show: false });
            that.companyimageError = that.translate.instant('errorMessage.ImageDimension');
            that.categoryForm.get('icon_file').setValidators([Validators.required]);
            return;
          } else {
            that._comm.notifyShowHideLoader({ show: false });
            that.companySelectFile = file;
            that.companyimgPreview = that.sanitizer.bypassSecurityTrustResourceUrl(
              companyLogoimg.src
            );
            that.companyImageText = "ChangeIcon";

          }
        }
      }
    } else {
      this.imageError = this.translate.instant('errorMessage.PleaseSelectImage');
    }
  }


}
