import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

export enum ThemeEnum {
  Dark = 'dark',
  Light = 'light',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  setTheme(theme: ThemeEnum) {
    if (theme == ThemeEnum.Dark) {
      this.addClass(ThemeEnum.Dark);
      this.removeClass(ThemeEnum.Light);
    } else if (theme == ThemeEnum.Light) {
      this.addClass(ThemeEnum.Light);
      this.removeClass(ThemeEnum.Dark);
    }
  }

  removeClass(theme: ThemeEnum) {
    this._renderer.removeClass(document.body, theme + '-theme');
  }

  addClass(theme: ThemeEnum) {
    this._renderer.addClass(document.body, theme + '-theme');
  }
}
