import { AdminService } from './../../../../services/admin.service';
import { Component, OnInit, Input } from '@angular/core';
import { BeerDefinitionModel } from '../../../../../models/BeerDefinitionModel';
import { FileUploader, ParsedResponseHeaders, FileItem } from 'ng2-file-upload';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-beer-item',
  templateUrl: './beer-item.component.html',
  styleUrls: ['./beer-item.component.scss']
})
export class BeerItemComponent implements OnInit {

  @Input()
  beer: BeerDefinitionModel;

  @Input()
  isEditable: boolean;

  uploader: FileUploader;
  isBusyUploading = false;



  constructor(private imgMaxService: Ng2ImgMaxService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.uploader = new FileUploader(this.getOptions());
    this.uploader.onSuccessItem = this.onSuccessfulUpload.bind(this);
  }

  handleUpload(event) {

    console.log('uploading beer image ...');

    const options = this.getOptions();

    console.log(options);

    this.uploader.setOptions(options);

    this.isBusyUploading = true;

    this.imgMaxService.resizeImage(event.target.files[0], 240, 240).subscribe(
      result => {
        const newImage = new File([result], result.name);
        this.uploader.clearQueue();
        this.uploader.addToQueue([newImage]);
        this.uploader.uploadAll();
      },
      error => console.log(error)
    );
  }


  onSuccessfulUpload(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    console.log('successfully uploaded file');
    console.log(response);
    this.beer.imageUrl = response;
    this.isBusyUploading = false;
  }

  private getOptions() {
    return {
      url: this.adminService.getBeerImageUploadUrl()
    };
  }
}
