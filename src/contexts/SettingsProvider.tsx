import { h, createContext, VNode } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { ComponentBaseProps, DisplayDensity, Settings, Theme } from '../models';
import {
  getStorageItem,
  setStorageItem,
  StorageKey,
} from '../services/storage';

const defaultSettings: Settings = {
  displayDensity: DisplayDensity.Compact,
  theme: Theme.Light,
  accentColor: 'BC4B51',
};

type SettingsContextValue = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

const defaultValue: SettingsContextValue = {
  settings: defaultSettings,
  setSettings: () => {},
};

const SettingsContext = createContext<SettingsContextValue>(defaultValue);

type SettingsProviderProps = ComponentBaseProps;

export function SettingsProvider(props: SettingsProviderProps): VNode {
  const [settings, setSettingsInternal] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const result = getStorageItem<Settings>(StorageKey.Settings);
    setSettingsInternal({ ...defaultSettings, ...result });
  }, []);

  function setSettings(val: Settings): void {
    setStorageItem<Settings>(StorageKey.Settings, val);
    setSettingsInternal(val);
  }

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
