import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
})
export class PreviewPage implements OnInit {

  request: any;

  apiResult = {
    loading: false,
    error: '',
    info: '',
  };
  isDownloadingFile = false;

  constructor(
    public modalCtrl: ModalController,
    private authService: AuthService,
    public navParams: NavParams,
    public alertController: AlertController,
  ) {
    this.request = this.navParams.get('request');
   }

  ngOnInit() {
  }
  // async presentAlertRequest(request) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: request.subject,
  //     subHeader: request.type,
  //     message: request.body,
  //     buttons: [
  //       {
  //         text: 'Accept',
  //         handler: () => {
  //           request.status = 2;
  //           this.processRequest(request);
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'destructive',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  processRequest(request) {
    this.apiResult.loading = true;
    return this.authService.postRequest(request).subscribe(
      (response) => {
        this.apiResult.loading = false;
        this.modalCtrl.dismiss();
      },
      (error) => {
        this.apiResult.error = 'Error occured while fetching data from server.';
        this.apiResult.loading = false;
      }
    );
  }
  cancel() {
    this.modalCtrl.dismiss();
  }

  decline() {
    this.request.status_id = 3;
    this.processRequest(this.request);

  }

  accept() {
    this.request.status_id = 2;
    this.processRequest(this.request);
  }

  formateDate(date){
    return new Date(date);
  }

  doDownload(fileId){
    this.isDownloadingFile = true;
    let url = null;
    return this.authService.downloadFile(fileId).subscribe(
      (data: any) => {
        // this.alertService.presentToast('The request has been sent successfully.')
        this.apiResult.error = null;
        const blob = data.slice(0, data.size, "application/pdf")
        url = window.URL.createObjectURL(blob);
        window.open(url);
        this.isDownloadingFile = false;
      },
      (error) => {
        this.apiResult.error = 'Error occured during sending to server';
        this.isDownloadingFile = false;
        console.log(error);
      },
      () => {
      }
    );
  }
}
