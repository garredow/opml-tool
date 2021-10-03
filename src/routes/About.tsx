import { h, VNode } from 'preact';
import { View } from '../ui-components';

interface Props {
  selectedItemId?: string;
}

export default function About({ selectedItemId }: Props): VNode {
  return (
    <View headerText="About" enableAppMenu={true}>
      <div></div>
    </View>
  );
}
