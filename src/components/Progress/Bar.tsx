import React, { useState, useEffect, ComponentProps } from 'react';
import {
  Animated,
  Easing,
  View,
  I18nManager,
  LayoutChangeEvent,
  LayoutAnimationType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Text } from 'core/base';
import { Token } from 'core';

const INDETERMINATE_WIDTH_FACTOR = 0.3;
const BAR_WIDTH_ZERO_POSITION =
  INDETERMINATE_WIDTH_FACTOR / (1 + INDETERMINATE_WIDTH_FACTOR);

type Props = Partial<
  ComponentProps<typeof View> & {
    animated: boolean;
    borderColor: string;
    borderRadius: number;
    borderWidth: number;
    children: React.ReactNode;
    color: string;
    height: number;
    indeterminate: boolean;
    indeterminateAnimationDuration: number;
    onLayout: LayoutChangeEvent;
    progress: number;
    style: StyleProp<ViewStyle>;
    unfilledColor: string;
    width: number;
    useNativeDriver: boolean;
    animationConfig: Animated.SpringAnimationConfig;
    animationType: LayoutAnimationType;
  }
>;

export default function ProgressBar({
  animated = true,
  borderColor,
  borderRadius = 4,
  borderWidth = 1,
  color = 'rgba(0, 122, 255, 1)',
  height = 6,
  indeterminate = false,
  indeterminateAnimationDuration = 1000,
  progress = 0,
  width = 150,
  unfilledColor,
  useNativeDriver = false,
  onLayout,
  animationConfig = { toValue: 0, bounciness: 0, useNativeDriver: true },
  animationType = 'spring',
  style,
  children,
  ...restProps
}: Props) {
  const progressNumber = Math.min(Math.max(progress, 0), 1);
  const [animationValue] = useState(
    new Animated.Value(BAR_WIDTH_ZERO_POSITION)
  );
  const [progressState] = useState(
    new Animated.Value(
      indeterminate ? INDETERMINATE_WIDTH_FACTOR : progressNumber
    )
  );
  const [widthState, setWidth] = useState(0);
  const innerWidth = Math.max(0, width || widthState) - borderWidth * 2;
  const containerStyle: ViewStyle = {
    width,
    borderWidth,
    borderColor: borderColor || color,
    borderRadius,
    overflow: 'hidden',
    backgroundColor: unfilledColor,
  };
  const progressStyle = {
    backgroundColor: color,
    height,
    transform: [
      {
        translateX: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [innerWidth * -INDETERMINATE_WIDTH_FACTOR, innerWidth],
        }),
      },
      {
        translateX: progressState.interpolate({
          inputRange: [0, 1],
          outputRange: [innerWidth / (I18nManager.isRTL ? 2 : -2), 0],
        }),
      },
      {
        // Interpolation a temp workaround for https://github.com/facebook/react-native/issues/6278
        scaleX: progressState.interpolate({
          inputRange: [0, 1],
          outputRange: [0.0001, 1],
        }),
      },
    ],
  };
  const handleLayout = (event: LayoutChangeEvent) => {
    if (!width) {
      setWidth(event.nativeEvent.layout.width);
    }
    onLayout?.(event);
  };

  useEffect(() => {
    if (indeterminate) {
      animate(animationValue, indeterminateAnimationDuration, useNativeDriver);
    } else {
      Animated.spring(animationValue, {
        toValue: BAR_WIDTH_ZERO_POSITION,
        useNativeDriver,
      }).start();
    }
  }, [
    indeterminate,
    animationValue,
    indeterminateAnimationDuration,
    useNativeDriver,
  ]);

  useEffect(() => {
    const progress = indeterminate
      ? INDETERMINATE_WIDTH_FACTOR
      : progressNumber;

    if (animated) {
      // @ts-ignore
      Animated[animationType](progressState, {
        ...animationConfig,
        toValue: progress,
        useNativeDriver,
      }).start();
    } else {
      progressState.setValue(progress);
    }
  }, [
    indeterminate,
    progressNumber,
    animated,
    animationConfig,
    animationType,
    progressState,
    useNativeDriver,
  ]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={[containerStyle, style]}
        onLayout={handleLayout}
        {...restProps}
      >
        <Animated.View style={progressStyle} />
        {children}
      </View>

      <Text
        variant="caption"
        ink="dark"
        style={{ marginLeft: Token.spacing.xs }}
      >{`${progress * 100} %`}</Text>
    </View>
  );
}

function animate(
  animationValue: Animated.AnimatedValue,
  duration: number,
  useNativeDriver: boolean
) {
  animationValue.setValue(0);
  Animated.timing(animationValue, {
    toValue: 1,
    duration,
    easing: Easing.linear,
    isInteraction: false,
    useNativeDriver,
  }).start((endState) => {
    if (endState.finished) {
      animate(animationValue, duration, useNativeDriver);
    }
  });
}
