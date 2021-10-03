import { h } from 'preact';
import { ComponentBaseProps } from '../models';
import styles from './Container.module.css';

type Props = ComponentBaseProps & {
  label?: string;
};

export function Container(props: Props) {
  return <div className={styles.root}>{props.children}</div>;
}
