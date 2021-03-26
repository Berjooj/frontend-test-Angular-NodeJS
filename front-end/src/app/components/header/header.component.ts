import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Oi';

  constructor(private translator: TranslateService) {
    translator.addLangs(['pt-BR', 'en']);
    translator.setDefaultLang('pt-BR');
  }

  ngOnInit(): void {
  }

  updateLanguage(language: string): void {
    this.translator.use(language);
  }
}
