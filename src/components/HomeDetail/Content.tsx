import React from 'react';
import { View } from 'react-native';
import { useTransition, animated, config } from 'react-spring';
import FormApply from './FormApply';
import Agreement from './Agreement';

const AnimatedView = animated(View);

export default function HomeDetailContent() {
  const [state, setState] = React.useState<'FORM' | 'TNC'>('FORM');
  const transitions = useTransition(state === 'TNC', {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
    config: config.molasses,
  });
  return transitions(({ opacity }, item) =>
    item ? (
      // @ts-ignore
      <AnimatedView style={{ opacity }}>
        <Agreement />
      </AnimatedView>
    ) : (
      // @ts-ignore
      <AnimatedView style={{ opacity }}>
        <FormApply onSubmit={() => setState('TNC')} />
      </AnimatedView>
    )
  );
}
