export enum Theme {
  Light = 'light',
  Dark = 'dark',
  Plain = 'plain',
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
