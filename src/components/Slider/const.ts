import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, Easing, Animated, ImageSourcePropType } from 'react-native';
import { Token as R } from 'core';

const TRACK_SIZE = 2;
const THUMB_SIZE = 32;
export const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_SIZE,
    borderRadius: TRACK_SIZE / 2,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    borderWidth: R.border.width.thin,
    borderColor: R.colors.grey,
  },
  touchArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  debugThumbTouchArea: {
    position: 'absolute',
    backgroundColor: R.colors.gold,
  },
});

type Value = number[] | number;
type AnimateValue = Animated.AnimatedValue[] | Animated.AnimatedValue;

export type Props = {
  value?: Value | AnimateValue;
  disabled?: boolean;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  thumbTouchSize?: {
    width: number;
    height: number;
  },
  onValueChange?: (value: Value) => void;
  onSlidingStart?: (value: Value) => void;
  onSlidingComplete?: (value: Value) => void;
  style?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  thumbImage?: ImageSourcePropType[];
  thumbView?: React.ReactNode;
  debugTouchArea?: boolean;
  animateTransitions?: boolean;
  animationType?: 'spring' | 'timing';
  animationConfig?: Animated.SpringAnimationConfig | Animated.TimingAnimationConfig;
  trackColor?: string;
  trackHighlightColor?: string;
};

export const defaultProps = {
  value: 0,
  minimumValue: 0,
  maximumValue: 100,
  step: 1,
  trackHighlightColor: '#3f3f3f',
  trackColor: '#b3b3b3',
  thumbTintColor: R.colors.white,
  thumbTouchSize: { width: 48, height: 48 },
  debugTouchArea: false,
  animationType: 'timing',
};

export const DEFAULT_ANIMATION_CONFIGS: { [key: string]: Animated.SpringAnimationConfig | Animated.TimingAnimationConfig } = {
  spring: {
    friction: 7,
    tension: 100,
  } as Animated.SpringAnimationConfig,
  timing: {
    duration: 150,
    easing: Easing.inOut(Easing.ease),
    delay: 0,
  } as Animated.TimingAnimationConfig,
};

export class Rect {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  containsPoint = (x: number, y: number) => {
    return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height;
  };
}
