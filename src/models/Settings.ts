export enum Theme {
  Light = 'light',
  Dark = 'dark',
  Cobalt = 'cobalt',
  Simple = 'simple',
}

export enum DisplayDensity {
  Normal = 'normal',
  Compact = 'compact',
}

export type Settings = {
  displayDensity: DisplayDensity;
  theme: Theme;
  accentColor: string;
};
