import React, { cloneElement } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import Controls from './Controls';
import useGestureSwiper from './useGestureSwiper';
import { Props } from './types';

export default function Swiper({
  positionFixed = false,
  controlsEnabled = true,
  containerStyle,
  innerContainerStyle,
  swipeAreaStyle,
  slideWrapperStyle,
  children,
  controlsProps,
  ...props
}: Props) {
  const ArrayChildren = (() => React.Children.toArray(children))();
  const count = (() => ArrayChildren.length)();
  const {
    onLayout,
    x,
    y,
    width,
    height,
    activeIndex,
    pan,
    _panResponder,
    goTo,
    goToPrev,
    goToNext,
  } = useGestureSwiper({
    ...props,
    totalChildCount: count,
  });

  return (
    <View
      style={StyleSheet.flatten([styles.root, containerStyle])}
      onLayout={onLayout}
    >
      <View
        style={StyleSheet.flatten([
          styles.container(positionFixed, x, y, width, height),
          innerContainerStyle,
        ])}
      >
        <Animated.View
          style={StyleSheet.flatten([
            styles.swipeArea(props.vertical || false, count, width, height),
            swipeAreaStyle,
            {
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            },
          ])}
          {..._panResponder.panHandlers}
        >
          {React.Children.map(children, (child, i) => (
            <View
              key={i}
              style={StyleSheet.flatten([{ width, height }, slideWrapperStyle])}
            >
              {cloneElement(child as React.ReactElement, {
                key: i - activeIndex ? i : -1,
                activeIndex,
                index: i,
              })}
            </View>
          ))}
        </Animated.View>
        {controlsEnabled && (
          <Controls
            {...controlsProps}
            vertical={props.vertical}
            count={count}
            activeIndex={activeIndex}
            isFirst={!props.loop && !activeIndex}
            isLast={!props.loop && activeIndex + 1 >= count}
            goToPrev={goToPrev}
            goToNext={goToNext}
            goTo={goTo}
          />
        )}
      </View>
    </View>
  );
}

const styles = {
  root: {
    backgroundColor: 'transparent',
  },
  // Fix web vertical scaling (like expo v33-34)
  container: (
    positionFixed: boolean,
    x: number,
    y: number,
    width: number,
    height: number
  ): ViewStyle => ({
    backgroundColor: 'transparent',
    // Fix safari vertical bounces
    // @ts-ignore
    position: positionFixed ? 'fixed' : 'relative',
    overflow: 'hidden',
    top: positionFixed ? y : 0,
    left: positionFixed ? x : 0,
    width,
    height,
    justifyContent: 'space-between',
  }),
  swipeArea: (
    vertical: boolean,
    count: number,
    width: number,
    height: number
  ): ViewStyle => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: vertical ? width : width * count,
    height: vertical ? height * count : height,
    flexDirection: vertical ? 'column' : 'row',
  }),
};
