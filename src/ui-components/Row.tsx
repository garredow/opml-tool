import { h } from 'preact';
import { forwardRef } from 'preact/compat';
import { SelectablePriority } from '../hooks/useDpad';
import { ComponentBaseProps } from '../models';
import { ifClass, joinClasses } from '../utils/classes';
import styles from './Row.module.css';

type Props = ComponentBaseProps & {
  label?: string;
};

export function Row(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.label}>{props.label}</div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
