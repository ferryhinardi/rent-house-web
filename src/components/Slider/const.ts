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
  /**
   * Initial value of the slider. The value should be between minimumValue
   * and maximumValue, which default to 0 and 1 respectively.
   * Default value is 0.
   *
   * *This is not a controlled component*, e.g. if you don't update
   * the value, the component won't be reset to its inital value.
   */
  value?: Value | AnimateValue;
  /**
   * If true the user won't be able to move the slider.
   * Default value is false.
   */
  disabled?: boolean;
  /**
   * Initial minimum value of the slider. Default value is 0.
   */
  minimumValue?: number;
  /**
   * Initial maximum value of the slider. Default value is 1.
   */
  maximumValue?: number;
  /**
   * Step value of the slider. The value should be between 0 and
   * (maximumValue - minimumValue). Default value is 0.
   */
  step?: number;
  /**
   * The color used for the track to the left of the button. Overrides the
   * default blue gradient image.
   */
  minimumTrackTintColor?: string;
  /**
   * The color used for the track to the right of the button. Overrides the
   * default blue gradient image.
   */
  maximumTrackTintColor?: string;
  /**
   * The color used for the thumb.
   */
  thumbTintColor?: string;
  /**
   * The size of the touch area that allows moving the thumb.
   * The touch area has the same center has the visible thumb.
   * This allows to have a visually small thumb while still allowing the user
   * to move it easily.
   * The default is {width: 40, height: 40}.
   */
  thumbTouchSize?: {
    width: number;
    height: number;
  },
  /**
   * Callback continuously called while the user is dragging the slider.
   */
  onValueChange?: (value: Value) => void;
  /**
   * Callback called when the user starts changing the value (e.g. when
   * the slider is pressed).
   */
  onSlidingStart?: (value: Value) => void;
  /**
   * Callback called when the user finishes changing the value (e.g. when
   * the slider is released).
   */
  onSlidingComplete?: (value: Value) => void;
  /**
   * The style applied to the slider container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The style applied to the track.
   */
  trackStyle?: StyleProp<ViewStyle>;
  /**
   * The style applied to the thumb.
   */
  thumbStyle?: StyleProp<ViewStyle>;
  /**
   * Sets an image for the thumb.
   */
  thumbImage?: ImageSourcePropType[];
  thumbView?: React.ReactNode;
  /**
   * Set this to true to visually see the thumb touch rect in green.
   */
  debugTouchArea?: boolean;
  /**
   * Set to true to animate values with default 'timing' animation type
   */
  animateTransitions?: boolean;
  /**
   * Custom Animation type. 'spring' or 'timing'.
   */
  animationType?: 'spring' | 'timing';
  /**
   * Used to configure the animation parameters.  These are the same parameters in the Animated library.
   */
  animationConfig?: Animated.SpringAnimationConfig | Animated.TimingAnimationConfig;
  /**
   * Set background color applied to the track outside selected.
   */
  trackColor?: string;
  /**
   * Set background color applied to the track inside selected.
   */
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
