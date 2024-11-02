import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeEnum, ThemeService } from '@shared/services/theme.service';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'root-page',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './root.page.html',
  styleUrl: './root.page.scss',
})
export class RootPage implements OnInit {
  constructor(private _themeService: ThemeService) {}

  ngOnInit(): void {
    const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (darkMode) {
      this._themeService.setTheme(ThemeEnum.Dark);
    } else {
      this._themeService.setTheme(ThemeEnum.Light);
    }
  }
}
