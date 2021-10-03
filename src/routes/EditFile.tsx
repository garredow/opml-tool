import { h, VNode } from 'preact';
import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { useFile } from '../contexts/FileProvider';
import { SelectablePriority, useDpad } from '../hooks/useDpad';
import { OpmlFile } from '../models';
import { ListItem, MenuOption, View } from '../ui-components';
import { Row } from '../ui-components/Row';
import { setSelected } from '../utils/navigation';
import styles from './EditFile.module.css';

interface Props {
  selectedItemId?: string;
}

export default function EditFile({ selectedItemId }: Props): VNode {
  const file = useFile();

  // Restore scroll position
  useEffect(() => {
    if (!selectedItemId) return;
    setSelected(selectedItemId, true);
  }, [selectedItemId]);

  useDpad({
    onEnter: (itemId) => {
      const feed = file.data?.feeds.find((a) => a.id === itemId)!;
      route(
        `/feed?feedId=${feed.id}&feedUrl=${encodeURIComponent(feed.xmlUrl)}`
      );
    },
    onChange: (itemId) => {
      if (itemId) {
        route(`/edit?selectedItemId=${itemId}`, true);
      } else {
        route(`/edit`, true);
      }
    },
  });

  function deleteFeed(feedId: string) {
    if (!file.data) return;

    const newData: OpmlFile = {
      ...file.data,
      feeds: file.data?.feeds.filter((a) => a.id !== feedId),
    };
    file.update(newData);
  }

  async function handleAction(action: string): Promise<void> {
    switch (action) {
      case 'addFeed':
        route('/search');
        break;
      case 'deleteFeed':
        deleteFeed(selectedItemId as string);
        break;
      case 'saveFile':
        file.save();
        break;
      case 'revertChanges':
        file.revertChanges();
        break;
      case 'closeFile':
        file.close();
        break;
    }
  }

  function getActions(): MenuOption[] {
    let result: MenuOption[] = [{ id: 'addFeed', label: 'Add Feed' }];

    if (selectedItemId?.startsWith('feed')) {
      result.push({ id: 'deleteFeed', label: 'Delete Feed' });
    }

    if (file.data) {
      result = [
        ...result,
        { id: 'revertChanges', label: 'Revert Changes' },
        { id: 'saveFile', label: 'Save File' },
        { id: 'closeFile', label: 'Close File' },
      ];
    }

    return result;
  }

  return (
    <View
      headerText={file.data?.filePath || 'Edit File'}
      centerMenuText={selectedItemId ? 'View' : ''}
      actions={getActions()}
      onAction={handleAction}
    >
      <div
        data-selectable-priority={SelectablePriority.Low}
        data-selectable-id=""
      ></div>
      {file.data?.title ? <Row label="Title">{file.data?.title}</Row> : null}
      {file.data?.dateCreated ? (
        <Row label="Date Created">{file.data?.dateCreated}</Row>
      ) : null}
      {file.data?.dateModified ? (
        <Row label="Date Modified">{file.data?.dateModified}</Row>
      ) : null}
      {file.data?.ownerName ? (
        <Row label="Owner Name">{file.data?.ownerName}</Row>
      ) : null}
      {file.data?.ownerEmail ? (
        <Row label="Owner Email">{file.data?.ownerEmail}</Row>
      ) : null}
      <div className={styles.feeds}>Feeds ({file.data?.feeds.length || 0})</div>
      {file.data?.feeds.map((feed, i) => (
        <ListItem
          key={feed.id}
          itemId={feed.id}
          primaryText={feed.text}
          secondaryText={feed.xmlUrl}
          shortcutKey={i + 1 <= 9 ? i + 1 : undefined}
        />
      ))}
      {file.data?.feeds.length === 0 ? (
        <div className={styles.message}>No feeds</div>
      ) : null}
    </View>
  );
}
