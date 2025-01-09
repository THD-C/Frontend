import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import themes from 'devextreme/ui/themes';
import { AvailableDevExtremeThemes, devextremeBootstrapThemesMap, devextremeThemesSwitchMap } from './themes.model';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  static readonly localStorageKey: string = 'theme';
  readonly defaultTheme: string = AvailableDevExtremeThemes.MaterialPurpleLight;
  readonly bootstrapDarkModeAttribute: string = 'data-bs-theme';

  get isDark(): boolean {
    return themes.current() === AvailableDevExtremeThemes.MaterialPurpleDark;
  }

  constructor(@Inject(DOCUMENT) private readonly document: Document) { }

  toggle(): void {
    const currentTheme = (localStorage.getItem(ThemesService.localStorageKey) ?? this.defaultTheme) as AvailableDevExtremeThemes;
    const themeToToggle = devextremeThemesSwitchMap.get(currentTheme)!;
    this.switchTo(themeToToggle);
  }

  /**
   * Used on page reload/initial load ONLY!
   */
  loadCached(): void {
    const theme = (localStorage.getItem(ThemesService.localStorageKey) ?? this.defaultTheme) as AvailableDevExtremeThemes;
    this.switchTo(theme);
  }

  private switchTo(dxThemeName: AvailableDevExtremeThemes): void {
    localStorage.setItem(ThemesService.localStorageKey, dxThemeName);
    themes.current(dxThemeName);
    const bsThemeName = devextremeBootstrapThemesMap.get(dxThemeName)!;
    this.document.body.setAttribute(this.bootstrapDarkModeAttribute, bsThemeName);
  }
}
