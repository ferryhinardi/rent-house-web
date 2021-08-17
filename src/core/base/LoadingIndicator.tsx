import React, { useEffect, useRef, useState } from 'react';

import { View, StyleSheet, Animated, Easing } from 'react-native';

import * as Token from './Token';

type Props = {
  dotSize?: number;
  count?: number;
  color?: string;
};

const SCALE_MIN = 1 / 3;
const SCALE_MAX = 1;
const OPACITY_MIN = 0.2;
const OPACITY_MAX = 1;
const ANIMATION_START_DELAY = Token.animation.timing.instant;

const animationConfig: any = {
  duration: Token.animation.timing.normal,
  easing: Easing.inOut(Easing.ease),
};

function createAnimations(count: number) {
  // We can't use fill directly with new Animated.Value because entire array values
  // will references the same instance. That's why we fill it first with empty string
  // to remove hole in array, and map over them to Animated.Value
  return new Array(count).fill('').map(() => new Animated.Value(SCALE_MIN));
}

function terminateAnimations(animations: Array<Animated.AnimatedValue>) {
  // Stopping animation is not enough because Animated.View still
  // references old Animated.Value, that's why we mutate them manually
  // to initial Animated.Value
  animations.forEach((v: Animated.AnimatedValue) => v.setValue(SCALE_MIN));
}

interface LoadingIndicatorAnimationUtility {
  animation: Animated.CompositeAnimation | null;
  createAnimationLoop: () => void;
  start: () => void;
  stop: () => void;
}

export default function LoadingIndicator(props: Props) {
  const { dotSize, color, ...remainingProps } = props;

  const [animations] = useState(createAnimations(props.count || 3));

  const utility = useRef<LoadingIndicatorAnimationUtility>({
    animation: null,
    createAnimationLoop: () => {
      utility.current.animation = Animated.loop(
        Animated.stagger(
          ANIMATION_START_DELAY,
          animations.map(value =>
            Animated.sequence([
              Animated.timing(value, {
                toValue: SCALE_MAX,
                ...animationConfig,
              }),
              Animated.timing(value, {
                toValue: SCALE_MIN,
                ...animationConfig,
              }),
            ])
          )
        )
      );
    },
    start: () => {
      // We need to recreate animation loops because restarting stopped animation
      // is not possible with just this.animation.start() call
      utility.current.createAnimationLoop();

      if (utility.current.animation) {
        // Because we have new instance of animation sequence, we can run .start
        // to trigger both start and restart event
        utility.current.animation.start();
      }
    },
    stop: () => {
      if (utility.current.animation) {
        utility.current.animation.stop();
        terminateAnimations(animations);
      }
    },
  });

  useEffect(() => {
    utility.current.createAnimationLoop();

    if (utility.current.animation) {
      utility.current.animation.start();
    }
  }, []);

  return (
    <View {...remainingProps} style={styles.container}>
      {animations.map((value, index) => (
        <Animated.View
          key={index}
          style={[
            {
              backgroundColor: color || Token.colors.gold,
              transform: [{ scale: value }],
              opacity: value.interpolate({
                inputRange: [SCALE_MIN, SCALE_MAX],
                outputRange: [OPACITY_MIN, OPACITY_MAX],
              }),
              height: dotSize || 16,
              width: dotSize || 16,
              borderRadius: (dotSize || 16) / 2,
              marginHorizontal: (dotSize || 16) / 12,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
