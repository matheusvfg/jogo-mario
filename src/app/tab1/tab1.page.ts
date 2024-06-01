import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  marioElement: any;
  pipeElement: any;
  jumpInterval: any;

  constructor(public alertController: AlertController) {}

  ngAfterViewInit() {
    this.marioElement = document.querySelector('.mario');
    this.pipeElement = document.querySelector('.pipe');
    this.detectCollision();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'O Mario colidiu, Game Over',
      buttons: ['OK']
    });

    await alert.present();
  }

  detectCollision() {
    setInterval(() => {
      let marioRect = this.marioElement.getBoundingClientRect();
      let pipeRect = this.pipeElement.getBoundingClientRect();
  
      let collisionBuffer = 10; // Ajuste este valor para alterar o tamanho do campo de colisão
  
      if (marioRect.x < pipeRect.x + pipeRect.width - collisionBuffer &&
          marioRect.x + marioRect.width > pipeRect.x + collisionBuffer &&
          marioRect.y < pipeRect.y + pipeRect.height - collisionBuffer &&
          marioRect.y + marioRect.height > pipeRect.y + collisionBuffer) {
            this.presentAlert();
      }
    }, 100);
  }
  jump() {
    this.marioElement.classList.add('mario-jumping');
  
    setTimeout(() => {
      this.marioElement.classList.remove('mario-jumping');
    }, 600);
  }
  
}
