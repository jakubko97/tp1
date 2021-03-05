import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';
import { User } from '../../models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Electromer } from 'src/app/models/electromer';
import { ElectromerService } from 'src/app/services/electromer/electromer.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  allElectromers: any;

  listElectromers: Array<Electromer>

  constructor(
    public modalCtrl: ModalController,
    private authService: AuthService,
    public navParams: NavParams,
    private electromerService: ElectromerService

    ) {}

  user: User = this.navParams.get('user');

  ngOnInit() {
    this.getElectromers()
    this.initItems()
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  save(){
    this.modalCtrl.dismiss();
  }

  public check(item: Electromer): Boolean{
    return true
  }

  initItems(){
    this.listElectromers = [
      {
      id: 1,
      name: "Elektromer 1",
      ip: "192.168.0.1",
      port: "8080",
      type: "type",
      },
      {
        id: 2,
        name: "Elektromer 2",
        ip: "192.168.0.2",
        port: "8080",
        type: "type",
        },
        {
          id: 3,
          name: "Elektromer 3",
          ip: "192.168.0.3",
          port: "8080",
          type: "type",
        }
  ]
  }
  public getElectromers(){
    return this.electromerService.getAll()
      .subscribe(electromers => {
        console.log(electromers)
       this.allElectromers = electromers as Electromer
       return electromers
  })
  }
}