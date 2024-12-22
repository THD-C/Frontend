export enum AvailableDevExtremeThemes {
  MaterialPurpleLight = 'material.purple.light',
  MaterialPurpleDark = 'material.purple.dark',
}

export enum AvailableBootstrapThemes {
  Light = 'light',
  Dark = 'dark',
}

export const devextremeBootstrapThemesMap: Map<AvailableDevExtremeThemes, AvailableBootstrapThemes> = new Map([
  [AvailableDevExtremeThemes.MaterialPurpleLight, AvailableBootstrapThemes.Light],
  [AvailableDevExtremeThemes.MaterialPurpleDark, AvailableBootstrapThemes.Dark],
]);

export const devextremeThemesSwitchMap: Map<AvailableDevExtremeThemes, AvailableDevExtremeThemes> = new Map([
  [AvailableDevExtremeThemes.MaterialPurpleLight, AvailableDevExtremeThemes.MaterialPurpleDark],
  [AvailableDevExtremeThemes.MaterialPurpleDark, AvailableDevExtremeThemes.MaterialPurpleLight],
]);
