import { h, VNode } from 'preact';
import { View } from '../ui-components';

interface Props {
  selectedItemId?: string;
}

export default function Settings({ selectedItemId }: Props): VNode {
  return (
    <View headerText="Settings" enableAppMenu={true}>
      <div></div>
    </View>
  );
}
