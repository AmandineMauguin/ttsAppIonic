import { Component } from '@angular/core';

import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  locale = 'fr-FR';
  rate = '2';
  
  constructor(
    private tts: TextToSpeech,
    private clipboard: Clipboard,
    private storage: Storage
  ) {}

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
  saveLocale(event) {
    this.storage.set('locale', this.locale);
  }

  saveRate(event) {
    this.storage.set('rate', this.rate);
    // console.log(event.target.value);
  }

  text2Speech:string;
  speak() {
    this.tts
      .speak({
        text: this.text2Speech,
        locale: 'fr-FR',
        rate: 2,
      })
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log('TSS ERROR : ', reason));
  }

  stop() {
    this.tts
      .speak('')
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

  pasteClip() {
    this.clipboard.paste().then(
      (resolve: string) => {
        alert(resolve);
      },
      (reject: string) => {
        alert('Clipboard error: ' + reject);
      }
    );
  }
  clear() {
    this.text2Speech = '';
  }
}
