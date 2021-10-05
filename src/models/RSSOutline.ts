export type RSSOutline = {
  id: string;
  parentId?: string;
  text: string;
  type: 'rss';
  xmlUrl: string;
  description?: string;
  htmlUrl?: string;
  language?: string;
  title?: string;
  version?: string;
};
