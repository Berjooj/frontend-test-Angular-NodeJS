import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.module.html',
  styles: []
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('pt-BR');
  }
}
