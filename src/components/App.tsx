import { h, VNode } from 'preact';
import { Route, Router } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { SettingsProvider, useSettings } from '../contexts/SettingsProvider';
import { themes } from '../themes';
import { DisplayDensity } from '../models';
import { FileProvider } from '../contexts/FileProvider';
import FileBrowser from '../routes/FileBrowser';
import EditFile from '../routes/EditFile';
import Search from '../routes/Search';
import FeedDetail from '../routes/FeedDetail';
import Settings from '../routes/Settings';
import About from '../routes/About';

export function AppWrapper(): VNode {
  return (
    <div id="preact_root">
      <SettingsProvider>
        <FileProvider>
          <App />
        </FileProvider>
      </SettingsProvider>
    </div>
  );
}

export default function App(): VNode {
  const { settings } = useSettings();

  useEffect(() => {
    // Theme
    const theme = themes.find((a) => a.id === settings.theme) || themes[0];
    for (const id in theme.values) {
      document.body.style.setProperty(
        `--${theme.values[id].variable}`,
        theme.values[id].value
      );
    }
    document.body.style.setProperty(
      '--app-accent-color',
      `#${settings.accentColor}`
    );
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.values.headerBgColor.value);

    if (theme.settings.accentText) {
      document.body.style.setProperty(
        '--accent-text-color',
        `#${settings.accentColor}`
      );
    }
    if (theme.settings.accentHighlight) {
      document.body.style.setProperty(
        '--highlight-bg-color',
        `#${settings.accentColor}`
      );
    }
    if (theme.settings.accentHeader) {
      document.body.style.setProperty(
        '--header-bg-color',
        `#${settings.accentColor}`
      );
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', `#${settings.accentColor}`);
    }

    // Layout
    if (settings.displayDensity === DisplayDensity.Compact) {
      document.body.setAttribute('data-compact-layout', '');
    } else {
      document.body.removeAttribute('data-compact-layout');
    }
  }, [settings]);

  return (
    <Router>
      <Route path="/files" component={FileBrowser} default={true} />
      <Route path="/edit" component={EditFile} />
      <Route path="/search" component={Search} />
      <Route path="/feed" component={FeedDetail} />
      <Route path="/settings" component={Settings} />
      <Route path="/about" component={About} />
    </Router>
  );
}
