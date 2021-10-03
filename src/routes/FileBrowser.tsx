import { h, VNode } from 'preact';
import { route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import { useFile } from '../contexts/FileProvider';
import { useDpad } from '../hooks/useDpad';
import { StorageFile } from '../models';
import { listOPMLFiles } from '../services/files';
import { ListItem, View } from '../ui-components';
import styles from './FileBrowser.module.css';

interface Props {
  selectedItemId?: string;
}

export default function FileBrowser({ selectedItemId }: Props): VNode {
  const [files, setFiles] = useState<StorageFile[] | null>([
    {
      id: 'file_1',
      name: 'example1.opml',
      path: '/local/example.opml',
      lastModified: '',
    },
  ]);

  const fileService = useFile();

  useEffect(() => {
    listOPMLFiles().then(setFiles);
  }, []);

  async function openFile(fileId: string) {
    const file = files?.find((a) => a.id === fileId);
    if (!file) return;
    await fileService.open(file.path);
    route('/edit');
  }

  useDpad({
    onEnter: openFile,
    onChange: (itemId) =>
      route(itemId ? `/files?selectedItemId=${itemId}` : '/files', true),
  });

  async function handleAction(action: string): Promise<void> {
    switch (action) {
      case 'refresh':
        listOPMLFiles().then(setFiles);
        break;
    }
  }

  return (
    <View
      headerText="File Browser"
      centerMenuText={selectedItemId ? 'Open' : ''}
      enableAppMenu={true}
      actions={[{ id: 'refresh', label: 'Refresh List' }]}
      onAction={handleAction}
    >
      {files?.map((file, i) => (
        <ListItem
          key={file.id}
          itemId={file.id}
          primaryText={file.name}
          secondaryText={file.path}
          shortcutKey={i + 1 <= 9 ? i + 1 : undefined}
        />
      ))}
    </View>
  );
}
