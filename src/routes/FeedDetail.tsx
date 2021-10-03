import { ApiEpisode, ApiPodcast } from 'foxcasts-core/lib/types';
import { h, VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useFile } from '../contexts/FileProvider';
import { useNavKeys } from '../hooks/useNavKeys';
import { OpmlFeed } from '../models';
import { Core } from '../services/core';
import { ListItem, View } from '../ui-components';
import { Row } from '../ui-components/Row';
import styles from './FeedDetail.module.css';

interface Props {
  feedId?: string;
  feedUrl: string;
}

type Feed = {
  title: string;
  feedUrl: string;
  author?: string;
  categories?: string;
  description?: string;
  htmlUrl?: string;
  language?: string;
  version?: string;
};

export default function FeedDetail({ feedId, feedUrl }: Props): VNode {
  const [podcast, setPodcast] = useState<Feed>();
  const [episodes, setEpisodes] = useState<ApiEpisode[]>([]);
  const [loading, setLoading] = useState(true);

  const file = useFile();
  const feedExists = file.data?.feeds.some((a) => a.xmlUrl === feedUrl);

  useEffect(() => {
    loadData();
  }, [feedId, feedUrl]);

  useNavKeys({
    Enter: () => {
      if (!file.data || !podcast) return;

      const newFeeds: OpmlFeed[] = feedExists
        ? file.data.feeds.filter((a) => a.xmlUrl !== feedUrl)
        : [
            ...(file.data?.feeds || []),
            {
              id: `feed${new Date().valueOf()}`,
              type: 'rss',
              text: podcast.title,
              xmlUrl: podcast.feedUrl,
              description: podcast.description || null,
              title: podcast.title || null,
              htmlUrl: null,
              language: null,
              version: null,
            },
          ];

      console.log('new feeds', newFeeds);

      file.update({
        ...file.data,
        feeds: newFeeds,
        dateModified: new Date().toISOString(),
      });
    },
  });

  async function loadData() {
    setLoading(true);

    const pod = await Core.fetchPodcast(null, feedUrl).catch(() => null);
    const fileData = file.data?.feeds.find((a) => a.id === feedId);
    setPodcast({
      title: pod?.title || fileData?.text || 'No title',
      feedUrl: pod?.feedUrl || fileData?.xmlUrl || '',
      author: pod?.author,
      categories: pod?.categories.join(', '),
      description: pod?.description || fileData?.description || undefined,
      htmlUrl: fileData?.htmlUrl || undefined,
      language: fileData?.language || undefined,
      version: fileData?.version || undefined,
    });

    const eps = pod ? await Core.fetchEpisodes(null, feedUrl, 20) : [];
    setEpisodes(eps);

    setLoading(false);
  }

  return (
    <View
      headerText="Review Feed"
      centerMenuText={feedExists ? 'Delete' : 'Add'}
    >
      <div className={styles.title}>{podcast?.title}</div>

      {podcast?.author ? <Row label="Author">{podcast?.author}</Row> : null}
      {podcast?.description ? (
        <Row label="Description">{podcast?.description}</Row>
      ) : null}
      {podcast?.categories ? (
        <Row label="Categories">{podcast?.categories}</Row>
      ) : null}
      {podcast?.htmlUrl ? (
        <Row label="Website URL">{podcast?.htmlUrl}</Row>
      ) : null}
      {podcast?.feedUrl ? <Row label="Feed URL">{podcast?.feedUrl}</Row> : null}
      {podcast?.version ? <Row label="Version">{podcast?.version}</Row> : null}
      {podcast?.language ? (
        <Row label="Language">{podcast?.language}</Row>
      ) : null}

      {loading ? <div className={styles.message}>Loading feed...</div> : null}
      {episodes.length > 0 ? (
        <div className={styles.episodes}>Episodes</div>
      ) : null}
      {episodes.map((episode) => (
        <ListItem
          key={episode.fileUrl}
          itemId={episode.fileUrl}
          primaryText={episode.title}
          secondaryText={new Date(episode.date).toLocaleDateString()}
        />
      ))}
    </View>
  );
}
