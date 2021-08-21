// Source from https://github.com/jeanregisser/react-native-slider/pull/142
import React, { Component } from 'react';
import {
  PanResponder,
  StyleSheet,
  View,
  Image,
  Animated,
  I18nManager,
  PanResponderInstance,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  PanResponderGestureState,
  LayoutChangeEvent,
} from 'react-native';

import { Token as R } from 'core';
import {
  Props,
  styles,
  defaultProps,
  Rect,
  DEFAULT_ANIMATION_CONFIGS,
} from './const';
import { prepareValuesFromProps } from './utils';

type Size = { width: number; height: number };
type State = {
  value: Animated.Value[];
  containerSize: Size;
  thumbSize: Size;
  valueRailLength: number;
  visualRailLength: number;
  thumbOffset: number;
  allMeasured: false;
  minThumbValue: Animated.Value;
  maxThumbValue: Animated.Value;
};

type SliderEvent = 'onSlidingStart' | 'onValueChange' | 'onSlidingComplete';

class Slider extends Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    if (!Array.isArray(props.value)) {
      const currentPropsValue = [props.value];

      if (currentPropsValue.length !== state.value.length) {
        const normalizeValues = prepareValuesFromProps(
          props.value! as number,
          props.maximumValue!,
          props.minimumValue!
        );

        return {
          ...state,
          value: normalizeValues,
        };
      }
    }

    return null;
  }

  static defaultProps = defaultProps;

  isMultiThumb: boolean;
  _panResponder: PanResponderInstance;
  interpolatedThumbValues: number[] | Animated.Value[];
  _trackingTouches: {
    [key: string]: {
      index: number;
      prevValue: Props['value'];
    };
  } = {};
  _containerSize?: Size;
  _thumbSize?: Size;

  constructor(props: Props) {
    super(props);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminationRequest: this._handlePanResponderRequestEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this.interpolatedThumbValues = [50, 179];
    const values = prepareValuesFromProps(
      props.value! as number,
      props.maximumValue!,
      props.minimumValue!
    ) as number[];

    this.isMultiThumb = values.length > 1;
    this.state = {
      containerSize: { width: 0, height: 0 },
      thumbSize: { width: 0, height: 0 },
      valueRailLength: 0,
      visualRailLength: 0,
      thumbOffset: 0,
      allMeasured: false,
      // could be array<number> / array<Animated.Value>
      value: values.map((val: any) => {
        val = new Animated.Value(val);
        val.addListener(this._onAnimatedValueChange);
        return val;
      }),
      minThumbValue: new Animated.Value(0),
      maxThumbValue: new Animated.Value(0),
    };
  }

  componentDidUpdate(prevProps: Props) {
    const oldValues = prevProps.value as number[];
    // could be array<number> / array<Animated.Value>
    const newValues = this.props.value as any;

    if (newValues.length !== this.state.value.length) {
      for (let i = 0; i < newValues.length; i++) {
        newValues[i] = new Animated.Value(newValues[i]);
        newValues[i].addListener(this._onAnimatedValueChange);
      }
    } else {
      for (let i = 0; i < newValues.length; i++) {
        const val = newValues[i];

        if (typeof val === 'number' && val !== oldValues[i]) {
          if (this.props.animateTransitions) {
            this._setCurrentValueAnimated(val, i);
          } else {
            this._setCurrentValue(val, i);
          }
        }
      }
    }
  }

  _onAnimatedValueChange = () => {
    if (this.state.value.length > 1) {
      const flatValues = this.interpolatedThumbValues.map((x: any) =>
        x.__getValue()
      );

      this.state.minThumbValue.setValue(Math.min(...flatValues));
      this.state.maxThumbValue.setValue(Math.max(...flatValues));
    }
  };

  _handleStartShouldSetPanResponder = (event: GestureResponderEvent) =>
    this._thumbHitTest(event) !== -1;
  _handleMoveShouldSetPanResponder = () => false;
  _handlePanResponderGrant = (event: GestureResponderEvent) => {
    event.preventDefault();
    const hitIndex = this._thumbHitTest(event);

    if (hitIndex === -1) return false;
    if (!this._trackingTouches) {
      this._trackingTouches = {};
    }

    this._trackingTouches[event.nativeEvent.identifier] = {
      index: hitIndex,
      prevValue: this._getThumb(this._getThumbValue(hitIndex)),
    };

    this._fireChangeEvent('onSlidingStart');
  };
  _handlePanResponderMove = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (this.props.disabled) {
      return;
    }

    const tracking = this._trackingTouches[event.nativeEvent.identifier];
    let newValue = this._getValue(tracking.prevValue, gestureState);

    if (tracking.index > 0) {
      const leftThumbPosition = this._getThumbValue(tracking.index - 1);
      newValue = Math.max(newValue, leftThumbPosition);
    }
    if (tracking.index < this.state.value.length - 1) {
      const rightThumbPosition = this._getThumbValue(tracking.index + 1);
      newValue = Math.min(newValue, rightThumbPosition);
    }

    this._setCurrentValue(newValue, tracking.index);
    this._fireChangeEvent('onValueChange');
  };
  _handlePanResponderEnd = (event: GestureResponderEvent) => {
    const tracking = this._trackingTouches[event.nativeEvent.identifier];
    delete this._trackingTouches[event.nativeEvent.identifier];

    if (this.props.disabled || !tracking) {
      return;
    }

    this._fireChangeEvent('onSlidingComplete');
  };
  _handlePanResponderRequestEnd = () => false;

  _setCurrentValue = (value: Animated.AnimatedValue | number, i: number) => {
    if (typeof value !== 'number') return;

    this.state.value[i].setValue(value);
  };

  _setCurrentValueAnimated = (value: number, i: number) => {
    const animationType = this.props.animationType;
    const animationConfig = Object.assign(
      {},
      DEFAULT_ANIMATION_CONFIGS[animationType!],
      this.props.animationConfig,
      {
        toValue: value,
      }
    );

    Animated[animationType!](this.state.value[i], animationConfig).start();
  };

  /**
   * Calculate the offset of the thumb on index i.
   *
   * The multi-thumb need to determine offset vector.
   * Left / right most thumb offsets to the left (-1) / right (1).
   * To align with the start of container, thumb's offset is added.
   *
   */
  _getVector = (i: number) => {
    const { value } = this.state;
    if (i === 0) {
      return -1;
    } else if (i === value.length - 1) {
      return 1;
    }
    return 0;
  };

  _getThumbOffset = (i: number) => {
    const { thumbOffset } = this.state;
    if (this.isMultiThumb) {
      const vector = this._getVector(i);
      return thumbOffset + vector * thumbOffset;
    }
    return thumbOffset;
  };

  _getThumbValue = (i: number) => (this.state.value[i] as any).__getValue();
  _getRatio = (value: number) =>
    (value - this.props.minimumValue!) /
    (this.props.maximumValue! - this.props.minimumValue!);
  _getThumb = (value: number) => {
    const nonRtlRatio = this._getRatio(value);
    const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;
    return ratio * this.state.valueRailLength;
  };
  _getValue = (
    value: Props['value'],
    gestureState: PanResponderGestureState
  ) => {
    const length = this.state.valueRailLength;
    const thumb = (value as number) + gestureState.dx;

    const nonRtlRatio = thumb / length;
    const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;
    const { step = 1, minimumValue, maximumValue } = this.props;

    const normalizedValue =
      Math.round((ratio * (maximumValue! - minimumValue!)) / step) * step;
    return Math.max(
      minimumValue!,
      Math.min(maximumValue!, minimumValue! + normalizedValue)
    );
  };
  _getTouchOverflowSize = () => {
    const { allMeasured, thumbSize, containerSize } = this.state;
    const { thumbTouchSize } = this.props;
    const size: { width?: number; height?: number } = {};

    if (allMeasured) {
      size.width = Math.max(0, thumbTouchSize?.width ?? 0 - thumbSize.width);
      size.height = Math.max(
        0,
        thumbTouchSize?.height ?? 0 - containerSize.height
      );
    }

    return size;
  };
  _getThumbTouchRect = (thumbLocation: number | Animated.AnimatedAddition) => {
    const { thumbSize, containerSize } = this.state;
    const { thumbTouchSize } = this.props;
    const touchOverflowSize = this._getTouchOverflowSize();

    return new Rect(
      (touchOverflowSize.width ?? 0) / 2 +
        (thumbLocation as any) +
        (thumbSize.width - thumbTouchSize?.width!) / 2,
      (touchOverflowSize.height ?? 0) / 2 +
        (containerSize.height - thumbTouchSize?.height!) / 2,
      thumbTouchSize?.width ?? 0,
      thumbTouchSize?.height ?? 0
    );
  };
  _getTouchOverflowStyle = () => {
    const { width, height } = this._getTouchOverflowSize();
    const touchOverflowStyle: StyleProp<ViewStyle> = {};

    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;

      const horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }

    if (this.props.debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = R.colors.gold;
      touchOverflowStyle.opacity = 0.6;
    }

    return touchOverflowStyle;
  };
  _getValueVisibleStyle = () => {
    if (!this.state.allMeasured) {
      return {
        opacity: 0,
      };
    }

    return {};
  };

  _fireChangeEvent = (event: SliderEvent) => {
    // @ts-ignore
    this.props?.[event]?.(this.state.value.map((x: any) => x.__getValue()));
  };

  _thumbHitTest = (event: GestureResponderEvent) => {
    const nativeEvent = event.nativeEvent;
    const { value } = this.state;
    let hitIndex = -1;

    for (let i = 0; i < value.length; i++) {
      const offset = this._getThumbOffset(i);
      const thumb = this._getThumb(this._getThumbValue(i)) + offset;
      const thumbRect = this._getThumbTouchRect(thumb);

      if (
        thumbRect.containsPoint(nativeEvent.locationX, nativeEvent.locationY)
      ) {
        hitIndex = i;
        break;
      }
    }

    return hitIndex;
  };

  /**
   * Measures layout sizes.
   * Multi-thumb and single-thumb sizes are different.
   *
   * Multi-thumb
   * -----------
   * - Value rail: Container width - 2 * Thumb width.
   *   The value starts from thumb's edges.
   * - Visual rail: Value rail + 2 * spacing.xxs.
   * - Thumb Offset: 1/2 Thumb width.
   *   Offsets from thumb's center.
   *
   * Single-thumb
   * ------------
   * - Value rail: Container width - 2 * (1/2 Thumb width).
   *   The value starts from thumb's center.
   * - Visual rail: Container width.
   *
   */
  _handleMeasure = (
    name: 'thumbSize' | 'containerSize',
    event: LayoutChangeEvent
  ) => {
    const { width, height } = event.nativeEvent.layout;
    const size = { width, height };

    const storeName = `_${name}`;
    // @ts-ignore
    const currentSize = this[storeName];

    if (
      currentSize &&
      width === currentSize.width &&
      height === currentSize.height
    ) {
      return;
    }

    // @ts-ignore
    this[storeName] = size;

    if (this._containerSize && this._thumbSize) {
      const state = {
        containerSize: this._containerSize,
        thumbSize: this._thumbSize,
        allMeasured: true,
      };

      if (this.isMultiThumb) {
        const valueRailLength =
          this._containerSize.width - 2 * this._thumbSize.width;
        const visualRailLength = valueRailLength + 2 * R.spacing.xxs;
        const thumbOffset = this._thumbSize.width / 2;
        // @ts-ignore
        this.setState({
          ...state,
          valueRailLength,
          visualRailLength,
          thumbOffset,
        });
        return;
      }

      const valueRailLength = this._containerSize.width - this._thumbSize.width;
      const visualRailLength = this._containerSize.width;
      // @ts-ignore
      this.setState({ ...state, valueRailLength, visualRailLength });
      return;
    }
  };

  _renderThumbImage = (thumbIndex: number) => {
    let { thumbImage, thumbView } = this.props;

    if (Array.isArray(thumbView)) {
      thumbView = thumbView[thumbIndex];
    }

    if (thumbView) return thumbView;

    if (Array.isArray(thumbImage)) {
      return (
        <Image
          source={thumbImage[thumbIndex]}
          style={{ width: '100%', height: '100%' }}
        />
      );
    }
  };

  _renderDebugThumbTouchRect = (
    thumbLeft: number | Animated.AnimatedAddition
  ) => {
    const thumbTouchRect = this._getThumbTouchRect(thumbLeft);
    const positionStyle = {
      left: thumbLeft,
      top: thumbTouchRect.y,
      width: thumbTouchRect.width,
      height: thumbTouchRect.height,
    };

    return (
      <Animated.View
        style={StyleSheet.flatten([styles.debugThumbTouchArea, positionStyle])}
        pointerEvents="none"
      />
    );
  };

  render() {
    const {
      minimumValue,
      maximumValue,
      minimumTrackTintColor,
      maximumTrackTintColor,
      thumbTintColor,
      style,
      trackStyle,
      debugTouchArea,
      trackHighlightColor,
      trackColor,
    } = this.props;

    const {
      containerSize,
      valueRailLength,
      visualRailLength,
      thumbOffset,
      thumbSize,
      value,
    } = this.state;

    let { minThumbValue, maxThumbValue } = this.state;

    const valueVisibleStyle = this._getValueVisibleStyle();
    const touchOverflowStyle = this._getTouchOverflowStyle();
    const thumbValues = (this.interpolatedThumbValues = value.map((v) =>
      v.interpolate({
        inputRange: [minimumValue!, maximumValue!],
        outputRange: I18nManager.isRTL
          ? [0, -valueRailLength]
          : [0, valueRailLength],
      })
    ) as Animated.AnimatedValue[]);
    const children = [];
    let trackHighlightStyle: StyleProp<ViewStyle>;

    if (this.isMultiThumb) {
      const sortedThumbValues = thumbValues.sort((value: any) =>
        value.__getValue()
      );
      minThumbValue = sortedThumbValues[0];
      maxThumbValue = sortedThumbValues[sortedThumbValues.length - 1];

      trackHighlightStyle = {
        position: 'absolute',
        left: Animated.add(
          minThumbValue,
          thumbSize.width / 2 + thumbOffset
        ) as any,
        width: Animated.add(
          Animated.multiply(minThumbValue, -1),
          maxThumbValue
        ) as any,
        marginTop: 0,
        backgroundColor: minimumTrackTintColor || trackHighlightColor,
        ...valueVisibleStyle,
      };
    } else {
      trackHighlightStyle = {
        position: 'absolute',
        left: 0,
        width: Animated.add(thumbValues[0], thumbSize.width / 2) as any,
        marginTop: 0,
        backgroundColor: minimumTrackTintColor || trackHighlightColor,
        ...valueVisibleStyle,
      };
    }

    children.push(
      <Animated.View
        key="track_highlight"
        renderToHardwareTextureAndroid
        style={[styles.track, trackStyle, trackHighlightStyle]}
      />
    );

    const thumbNodes = [];
    const thumbHandlerNodes = [];

    for (let i = 0; i < thumbValues.length; i++) {
      const offset = new Animated.Value(this._getThumbOffset(i));
      const position = Animated.add(thumbValues[i], offset);

      thumbNodes.push(
        <Animated.View
          key={`thumb_${i}`}
          renderToHardwareTextureAndroid
          onLayout={(event) => this._handleMeasure('thumbSize', event)}
          style={StyleSheet.flatten([
            styles.thumb,
            { backgroundColor: thumbTintColor },
            {
              transform: [{ translateX: position }],
              ...valueVisibleStyle,
            },
          ])}
        >
          {this._renderThumbImage(i)}
        </Animated.View>
      );

      thumbHandlerNodes.push(
        <View
          key={`panhandlers_${i}`}
          renderToHardwareTextureAndroid
          style={StyleSheet.flatten([styles.touchArea, touchOverflowStyle])}
          {...this._panResponder.panHandlers}
        >
          {debugTouchArea && this._renderDebugThumbTouchRect(position)}
        </View>
      );
    }

    children.push(...thumbNodes, ...thumbHandlerNodes);

    return (
      <View
        style={StyleSheet.flatten([styles.container, style])}
        onLayout={(event) => this._handleMeasure('containerSize', event)}
      >
        <View
          renderToHardwareTextureAndroid
          style={StyleSheet.flatten([
            {
              backgroundColor: maximumTrackTintColor || trackColor,
              marginHorizontal: (containerSize.width - visualRailLength) / 2,
            },
            styles.track,
            trackStyle,
          ])}
        />
        {children}
      </View>
    );
  }
}

export default Slider;
