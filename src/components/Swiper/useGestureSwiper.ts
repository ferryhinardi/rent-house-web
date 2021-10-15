import { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  Animated,
  I18nManager,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  LayoutChangeEvent,
} from 'react-native';
import { Props } from './types';

const useNativeDriver = false; // because of RN #13377
type Options = Props & {
  totalChildCount?: number;
};

export default function useGestureSwiper({
  vertical = false,
  from = 0,
  loop = false,
  timeout = 0,
  gesturesEnabled = () => true,
  minDistanceToCapture = 5,
  minDistanceForAction = 0.2,
  springConfig,
  onAnimationStart,
  onAnimationEnd,
  onIndexChanged,
  totalChildCount = 0,
}: Options) {
  let _animatedValueX = 0;
  let _animatedValueY = 0;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(from);
  const [pan] = useState(new Animated.ValueXY());
  let autoPlay = useRef<ReturnType<typeof setTimeout>>();

  const startAutoplay = () => {
    if (timeout) {
      autoPlay.current = setTimeout(autoplayTimeout, Math.abs(timeout) * 1000);
    }
  };
  const stopAutoplay = () => {
    if (autoPlay.current) {
      clearTimeout(autoPlay.current);
    }
  };
  const autoplayTimeout = () => {
    _goToNeighboring(timeout < 0);
  };
  const _getFixState = () => {
    _animatedValueX = vertical
      ? 0
      : width * activeIndex * (I18nManager.isRTL ? 1 : -1);
    _animatedValueY = vertical ? height * activeIndex * -1 : 0;
    pan.setOffset({
      x: _animatedValueX,
      y: _animatedValueY,
    });
    pan.setValue({ x: 0, y: 0 });
  };
  const fixAndGo = (delta = 1) => {
    _getFixState();
    _changeIndex(delta);
    onAnimationStart?.(activeIndex);
  };
  const _goToNeighboring = (toPrev = false) => {
    fixAndGo(toPrev ? -1 : 1);
  };
  const _spring = (
    toValue:
      | Animated.AnimatedValue
      | Animated.AnimatedValueXY
      | { x: number; y: number }
  ) => {
    Animated.spring(pan, {
      ...springConfig,
      toValue,
      useNativeDriver, // false, see top of file
    }).start(() => onAnimationEnd?.(activeIndex));
  };
  const _changeIndex = (delta = 1) => {
    let toValue = { x: 0, y: 0 };
    let skipChanges = !delta;
    let calcDelta = delta;

    if (activeIndex <= 0 && delta < 0) {
      skipChanges = !loop;
      calcDelta = totalChildCount + delta;
    } else if (activeIndex + 1 >= totalChildCount && delta > 0) {
      skipChanges = !loop;
      calcDelta = -1 * activeIndex + delta - 1;
    }

    if (skipChanges) {
      return _spring(toValue);
    }

    stopAutoplay();

    let index = activeIndex + calcDelta;
    setActiveIndex(index);

    if (vertical) {
      toValue.y = height * -1 * calcDelta;
    } else {
      toValue.x = width * (I18nManager.isRTL ? 1 : -1) * calcDelta;
    }
    _spring(toValue);

    stopAutoplay();
    onIndexChanged?.(index);
  };
  const _panResponder = PanResponder.create({
    onPanResponderTerminationRequest: () => false,
    onMoveShouldSetPanResponderCapture: (
      e: GestureResponderEvent,
      gestureState: PanResponderGestureState
    ) => {
      if (!gesturesEnabled()) {
        return false;
      }

      onAnimationStart?.(activeIndex);

      const allow =
        Math.abs(vertical ? gestureState.dy : gestureState.dx) >
        minDistanceToCapture;

      if (allow) {
        stopAutoplay();
      }

      return allow;
    },
    onPanResponderGrant: _getFixState,
    onPanResponderMove: Animated.event(
      [null, vertical ? { dy: pan.y } : { dx: pan.x }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (
      e: GestureResponderEvent,
      gestureState: PanResponderGestureState
    ) => {
      startAutoplay();

      const correction = vertical
        ? gestureState.moveY - gestureState.y0
        : gestureState.moveX - gestureState.x0;

      if (
        Math.abs(correction) <
        (vertical ? height : width) * minDistanceForAction
      ) {
        _spring({ x: 0, y: 0 });
      } else {
        _changeIndex(
          correction > 0
            ? !vertical && I18nManager.isRTL
              ? 1
              : -1
            : !vertical && I18nManager.isRTL
            ? -1
            : 1
        );
      }
    },
    // @ts-ignore
    onMoveShouldSetResponderCapture: () => true,
  });
  const onLayout = ({
    nativeEvent: {
      layout: { x, y, width, height },
    },
  }: LayoutChangeEvent) => {
    ReactDOM.unstable_batchedUpdates(() => {
      setX(x);
      setY(y);
      setWidth(width);
      setHeight(height);
    });
    _getFixState();
  };
  const goToNext = () => {
    _goToNeighboring();
  };

  const goToPrev = () => {
    _goToNeighboring(true);
  };

  const goTo = (index = 0) => {
    const delta = index - activeIndex;
    if (delta) {
      fixAndGo(delta);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    pan.x.addListener(({ value }) => (_animatedValueX = value));
    // eslint-disable-next-line
    pan.y.addListener(({ value }) => (_animatedValueY = value));
    startAutoplay();

    return () => {
      stopAutoplay();
      pan.x.removeAllListeners();
      pan.y.removeAllListeners();
    };
  }, []);

  return {
    _panResponder,
    pan,
    onLayout,
    x,
    y,
    width,
    height,
    activeIndex,
    goTo,
    goToNext,
    goToPrev,
  };
}
