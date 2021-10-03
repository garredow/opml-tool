import { h, VNode } from 'preact';
import { ComponentBaseProps } from '../models';
import { joinClasses } from '../utils/classes';
import styles from './Tabs.module.css';

type Tab = {
  id: string;
  name: string;
};

type Props = ComponentBaseProps & {
  tabs: Tab[];
  selectedTab: string;
};

export function Tabs(props: Props): VNode {
  const index = props.tabs.findIndex((a) => a.id === props.selectedTab);
  const prevTab = props.tabs[index - 1];
  const nextTab = props.tabs[index + 1];

  return (
    <div className={joinClasses(styles.root, props.className)}>
      {prevTab ? (
        <div className={styles.leftTab}>
          <div className={styles.chevronLeft} />
          {prevTab.name}
        </div>
      ) : (
        <div />
      )}
      {nextTab ? (
        <div className={styles.rightTab}>
          {nextTab.name}
          <div className={styles.chevronRight} />
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
