import { h } from 'preact';
import { route } from 'preact-router';
import { Menu, MenuOption } from '../ui-components';

interface AppMenuProps {
  onClose: () => void;
}

export function AppMenu(props: AppMenuProps): h.JSX.Element | null {
  const options: MenuOption[] = [
    { id: 'fileBrowser', label: 'File Browser' },
    { id: 'settings', label: 'Settings' },
    { id: 'about', label: 'About' },
  ];

  function handleSelect(id: string): void {
    const routes: any = {
      fileBrowser: '/files',
      settings: '/settings',
      about: '/about',
    };

    route(routes[id]);
    props.onClose();
  }

  return (
    <Menu options={options} onSelect={handleSelect} onClose={props.onClose} />
  );
}
