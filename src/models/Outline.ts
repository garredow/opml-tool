import { RSSOutline } from '.';

export type Outline = {
  id: string;
  parentId?: string;
  text: string;
  type?: string;
  xmlUrl?: string;
  description?: string;
  htmlUrl?: string;
  language?: string;
  title?: string;
  version?: string;
  children?: RSSOutline[];
};
