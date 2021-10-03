import { h, VNode } from 'preact';
import { useRef, useState } from 'preact/hooks';
import { useSettings } from '../contexts/SettingsProvider';
import { SelectablePriority, useDpad } from '../hooks/useDpad';
import { Settings, Theme } from '../models';
import { ThemeConfig, themes } from '../themes';
import { Menu, MenuOption, View } from '../ui-components';
import { SelectableRow } from '../ui-components/SelectableRow';
import styles from './Settings.module.css';

interface Props {
  selectedItemId?: string;
}

type SelectMenu = {
  settingsKey: keyof Settings;
  title: string;
  options: MenuOption[];
};

export default function AppSettings({ selectedItemId }: Props): VNode {
  const { settings, setSettings } = useSettings();
  const [selectMenu, setSelectMenu] = useState<SelectMenu>();
  const accentColorRef = useRef<HTMLInputElement>(null);

  function saveSetting(key: keyof Settings, value: any): void {
    setSettings({
      ...settings,
      [key]: value,
    });
  }

  function handleClick(id: string): void {
    switch (id) {
      case 'theme':
        setSelectMenu({
          settingsKey: 'theme',
          title: 'Theme',
          options: [
            { id: Theme.Light, label: 'Light' },
            { id: Theme.Dark, label: 'Dark' },
            { id: Theme.Plain, label: 'Plain' },
          ],
        });
        break;
      case 'accentColor':
        saveSetting('accentColor', accentColorRef.current?.value);
        break;
    }
  }

  useDpad({
    priority: SelectablePriority.Low,
    onEnter: handleClick,
    onChange: (itemId) => {
      if (itemId === 'accentColor') {
        accentColorRef.current?.focus();
      } else {
        accentColorRef.current?.blur();
      }
    },
  });

  function handleSettingSelect(key: keyof Settings, value: string): void {
    if (key === 'theme') {
      // We want to use the theme's original accent color
      const theme = themes.find((a) => a.id === value) as ThemeConfig;
      setSettings({
        ...settings,
        theme: value as Theme,
        accentColor: theme.values.appAccentColor.value.slice(1),
      });
    } else {
      saveSetting(key, value);
    }

    setSelectMenu(undefined);
  }

  return (
    <View headerText="Settings" enableAppMenu={true}>
      <SelectableRow selectableId="theme">
        Theme
        <span className={styles.selectValue}>{settings.theme}</span>
      </SelectableRow>
      <SelectableRow selectableId="accentColor">
        Accent Color
        <input
          ref={accentColorRef}
          type="text"
          value={settings.accentColor}
          size={6}
          maxLength={6}
        />
      </SelectableRow>
      {selectMenu ? (
        <Menu
          title={selectMenu.title}
          options={selectMenu.options}
          closeSide="right"
          onSelect={(id): void =>
            handleSettingSelect(selectMenu.settingsKey, id)
          }
          onClose={(): void => setSelectMenu(undefined)}
        />
      ) : null}
    </View>
  );
}
