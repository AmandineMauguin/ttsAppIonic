import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  locale = 'fr-FR';
  rate = '2';

  constructor(private storage: Storage) {}

  saveLocale(event) {
    this.storage.set('locale', this.locale);
  }

  saveRate(event) {
    this.storage.set('rate', this.rate);
    // console.log(event.target.value);
  }

  ionViewWillEnter() {
    this.storage.get('locale').then((val) => {
      console.log('La valeur de local :', val);
      this.locale = val ?? val; //Puis on test si la valeur contient bien quelque chose
    });
    this.storage.get('rate').then((val) => {
      console.log('La valeur de rate :', val);
      if (val) this.rate = val; //Puis on test si la valeur contient bien quelque chose
    });
  }
}
