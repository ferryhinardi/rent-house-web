import { useState } from 'react';
import { ViewStyle } from 'react-native';

import { animation } from '../base/Token';
import { useHoverable } from './useHoverable';

export type TransitionConfiguration = {
  transitionDuration?: number;
  transitionDelay?: number;
  transitionTimingFunction?: number;
};

export function useCSSTransition<Behavior extends string>(
  styleBehaviorMap: { [key in keyof ViewStyle]: { [key in Behavior]: any } },
  defaultBehavior: Behavior,
  transitionConfiguration: TransitionConfiguration
) {
  const [currentBehavior, setCurrentBehavior] = useState<Behavior>(defaultBehavior);

  const style = generateStyle(styleBehaviorMap, currentBehavior, transitionConfiguration);

  return {
    currentBehavior,
    setCurrentBehavior,
    style,
  };
}

export default useCSSTransition;

function generateStyle(
  styleBehaviorMap: { [key in keyof ViewStyle]: any },
  currentBehavior: any,
  transitionConfiguration: TransitionConfiguration
): ViewStyle {
  const {
    transitionDuration = animation.timing.instant,
    transitionDelay = 0,
    transitionTimingFunction = 'ease',
  } = transitionConfiguration;

  const dynamicStyle = Object.entries(styleBehaviorMap).reduce(
    (res, [property, behaviorValueMap]: [any, any]) => ({
      ...res,
      [property]: behaviorValueMap[currentBehavior],
    }),
    {}
  );

  const transitionProperty = Object.keys(styleBehaviorMap)
    .slice(1)
    .reduce((res, cur) => `${res}, ${camelToKebab(cur)}`, camelToKebab(Object.keys(styleBehaviorMap)[0]));

  return {
    ...dynamicStyle,
    // @ts-ignore
    transitionDuration: `${transitionDuration}ms`,
    transitionDelay: `${transitionDelay}ms`,
    transitionTimingFunction,
    transitionProperty,
    willChange: transitionProperty,
  };
}

function camelToKebab(v?: string) {
  if (!v) return '';
  return v.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export type HoverFocusBehavior = 'normal' | 'hovered' | 'focused';

export type HoverFocusBehaviorStyleMap = {
  [key in keyof ViewStyle]: { [key in HoverFocusBehavior]: any };
};

export type HoverFocusEventHandlers = {
  onMouseEnter?: any;
  onMouseOut?: any;
  onFocus?: any;
  onBlur?: any;
};

export function useCSSHoverFocusTransition(
  styleBehaviorMap: HoverFocusBehaviorStyleMap,
  defaultBehavior: HoverFocusBehavior = 'normal',
  transitionConfiguration: TransitionConfiguration = {},
  customHandlers: HoverFocusEventHandlers = {}
) {
  const { currentBehavior, setCurrentBehavior, style } = useCSSTransition<HoverFocusBehavior>(
    styleBehaviorMap,
    defaultBehavior,
    transitionConfiguration
  );

  const { onMouseEnter, onMouseOut, onFocus, onBlur } = customHandlers;

  const [_, hoverEventHandlers] = useHoverable({
    onMouseEnter: () => onMouseEnterHandler(currentBehavior, setCurrentBehavior, onMouseEnter),
    onMouseOut: () => onMouseOutHandler(currentBehavior, defaultBehavior, setCurrentBehavior, onMouseOut),
  });

  const focusEventHandlers = {
    onFocus: (e: any) => onFocusHandler(e, setCurrentBehavior, onFocus),
    onBlur: (e: any) => onBlurHandler(e, defaultBehavior, setCurrentBehavior, onBlur),
  };

  return {
    isHovered: currentBehavior === 'hovered',
    hoverEventHandlers,
    isFocused: currentBehavior === 'focused',
    focusEventHandlers,
    style,
  };
}

function onMouseEnterHandler(currentBehavior: string, setCurrentBehavior: any, onMouseEnter?: any) {
  if (onMouseEnter) {
    onMouseEnter();
  }

  if (currentBehavior === 'normal') {
    setCurrentBehavior('hovered');
  }
}

function onMouseOutHandler(
  currentBehavior: string,
  defaultBehavior: string,
  setCurrentBehavior: any,
  onMouseOut?: any
) {
  if (onMouseOut) {
    onMouseOut();
  }

  if (currentBehavior === 'hovered') {
    setCurrentBehavior(defaultBehavior);
  }
}

function onFocusHandler(e: any, setCurrentBehavior: any, onFocus?: any) {
  if (onFocus) {
    onFocus(e);
  }

  setCurrentBehavior('focused');
}

function onBlurHandler(e: any, defaultBehavior: string, setCurrentBehavior: any, onBlur?: any) {
  if (onBlur) {
    onBlur(e);
  }

  setCurrentBehavior(defaultBehavior);
}
