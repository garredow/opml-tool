import { Theme } from "./models/Settings";

export type ThemeValue = {
    variable: string;
    value: string;
};
  
export type ThemeConfig = {
    id: Theme;
    settings: {
        accentHeader: boolean;
        accentHighlight: boolean;
        accentText: boolean;
    };
    values: {
        [key: string]: ThemeValue;
        appBgColor: ThemeValue;
        appAccentColor: ThemeValue;
        primaryTextColor: ThemeValue;
        secondaryTextColor: ThemeValue;
        accentTextColor: ThemeValue;
        dividerColor: ThemeValue;
        highlightBgColor: ThemeValue;
        highlightTextColor: ThemeValue;
        headerBgColor: ThemeValue;
        headerTextColor: ThemeValue;
        menuBgColor: ThemeValue;
        menuTextColor: ThemeValue;
        menubarBgColor: ThemeValue;
        menubarTextColor: ThemeValue;
        inputBorderColor: ThemeValue;
    };
};

export const themes: ThemeConfig[] = [
    {
        id: Theme.Light,
        settings: {
            accentHeader: true,
            accentHighlight: true,
            accentText: true,
        },
        values: {
            appBgColor: { variable: 'app-bg-color', value: '#ffffff' },
            appAccentColor: { variable: 'app-accent-color', value: '#BC4B51' },
            primaryTextColor: { variable: 'primary-text-color', value: 'rgba(0, 0, 0, 0.88)' },
            secondaryTextColor: { variable: 'secondary-text-color', value: 'rgba(0, 0, 0, 0.5)' },
            accentTextColor: { variable: 'accent-text-color', value: '#BC4B51' },
            dividerColor: { variable: 'divider-color', value: 'rgba(0, 0, 0, 0.1)' },
            highlightBgColor: { variable: 'highlight-bg-color', value: '#BC4B51' },
            highlightTextColor: { variable: 'highlight-text-color', value: 'rgba(255, 255, 255, 0.88)' },
            headerBgColor: { variable: 'header-bg-color', value: '#BC4B51' },
            headerTextColor: { variable: 'header-text-color', value: 'rgba(255, 255, 255, 0.88)' },
            menuBgColor: { variable: 'menu-bg-color', value: '#ffffff' },
            menuTextColor: { variable: 'menu-text-color', value: 'rgba(0, 0, 0, 0.88)' },
            menubarBgColor: { variable: 'menubar-bg-color', value: '#000000' },
            menubarTextColor: { variable: 'menubar-text-color', value: 'rgba(255, 255, 255, 0.88)' },
            inputBorderColor: { variable: 'input-border-color', value: '#aaaaaa' },
        }
    },
    {
        id: Theme.Dark,
        settings: {
            accentHeader: true,
            accentHighlight: true,
            accentText: true,
        },
        values: {
            appBgColor: { variable: 'app-bg-color', value: '#211c1e' },
            appAccentColor: { variable: 'app-accent-color', value: '#B34248' },
            primaryTextColor: { variable: 'primary-text-color', value: 'rgba(255, 255, 255, 0.88)' },
            secondaryTextColor: { variable: 'secondary-text-color', value: 'rgba(255, 255, 255, 0.5)' },
            accentTextColor: { variable: 'accent-text-color', value: '#B34248' },
            dividerColor: { variable: 'divider-color', value: 'rgba(255, 255, 255, 0.1)' },
            highlightBgColor: { variable: 'highlight-bg-color', value: '#B34248' },
            highlightTextColor: { variable: 'highlight-text-color', value: 'rgba(255, 255, 255, 0.88)' },
            headerBgColor: { variable: 'header-bg-color', value: '#B34248' },
            headerTextColor: { variable: 'header-text-color', value: 'rgba(255, 255, 255, 0.88)' },
            menuBgColor: { variable: 'menu-bg-color', value: '#211c1e' },
            menuTextColor: { variable: 'menu-text-color', value: 'rgba(255, 255, 255, 0.88)' },
            menubarBgColor: { variable: 'menubar-bg-color', value: '#000000' },
            menubarTextColor: { variable: 'menubar-text-color', value: 'rgba(255, 255, 255, 0.88)' },
            inputBorderColor: { variable: 'input-border-color', value: '#aaaaaa' },
        }
    },
    {
        id: Theme.Plain,
        settings: {
            accentHeader: false,
            accentHighlight: false,
            accentText: false,
        },
        values: {
            appBgColor: { variable: 'app-bg-color', value: '#ffffff' },
            appAccentColor: { variable: 'app-accent-color', value: '#274854' },
            primaryTextColor: { variable: 'primary-text-color', value: 'rgba(0, 0, 0, 0.88)' },
            secondaryTextColor: { variable: 'secondary-text-color', value: 'rgba(0, 0, 0, 0.5)' },
            accentTextColor: { variable: 'accent-text-color', value: '#274854' },
            dividerColor: { variable: 'divider-color', value: 'rgba(0, 0, 0, 0.1)' },
            highlightBgColor: { variable: 'highlight-bg-color', value: 'rgba(0, 0, 0, 0.2)' },
            highlightTextColor: { variable: 'highlight-text-color', value: 'rgba(0, 0, 0, 0.88)' },
            headerBgColor: { variable: 'header-bg-color', value: '#ffffff' },
            headerTextColor: { variable: 'header-text-color', value: 'rgba(0, 0, 0, 0.88)' },
            menuBgColor: { variable: 'menu-bg-color', value: '#ffffff' },
            menuTextColor: { variable: 'menu-text-color', value: 'rgba(0, 0, 0, 0.88)' },
            menubarBgColor: { variable: 'menubar-bg-color', value: '#ffffff' },
            menubarTextColor: { variable: 'menubar-text-color', value: 'rgba(0, 0, 0, 0.88)' },
            inputBorderColor: { variable: 'input-border-color', value: '#aaaaaa' },
        }
    },
];