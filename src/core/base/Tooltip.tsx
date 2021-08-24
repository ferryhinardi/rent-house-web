import React, { useRef } from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import useLayout from '../hooks/useLayout';
import { useHoverable } from '../hooks/useHoverable';

import Text from './Text';
import * as Token from './Token';

type TooltipVariant = 'normal' | 'alert';

type Position = 'top' | 'right' | 'bottom' | 'left';

type TooltipContentProps = {
  /**
   * Content shown on the tooltip, either accepts a string or a valid react node.
   */
  content: React.ReactNode;
  /**
   * Color variance of tooltip
   *
   * @default 'normal'
   */
  variant?: TooltipVariant;
  /**
   * Intended position of the tooltip,
   * @default 'top'
   */
  position?: Position;
  /**
   * Desired width of tooltip content,
   * 'auto' means it will follow the content width
   * 'stretchToChild' means it will follow the child width
   * any number means it will be set ot that value.
   *
   * @default 'auto'
   */
  width?: 'auto' | 'stretchToChild' | number;
  /**
   * Desired offset of the tooltip from its content's edge
   * i.e. if positioned on top, it will apply the offset value as a
   * margin from the top edge of the child to the bottom edge of the tooltip
   *
   * @default Token.spacing.xxs,
   */
  offset?: { x?: number; y?: number };
  /**
   * Controlled prop. The default behaviour of this tooltip is show-on-hover.
   * If you need to override this behaviour, use this prop.
   */
  show?: boolean;
  /**
   * This props is to cater cases where your tooltip is on top of a component that has zIndex
   */
  contentZIndex?: number;
  /**
   * Automated testID
   */
  testID?: string;
};

type Props = {
  children: React.ReactNode;
  containerStyle?: ViewStyle;
} & TooltipContentProps;

// API Inspiration: https://ui.reach.tech/tooltip/
export default function Tooltip(props: Props) {
  const parentRef = useRef<View | null>();
  const { children, show, containerStyle = {}, ...tooltipContentProps } = props;

  const isControlled = typeof show === 'boolean';

  const [isHovered, hoverEventBindings] = useHoverable();
  const [baseLayout, baseLayoutBindings] = useLayout();

  const shouldShowContent = isControlled ? show === true : isHovered;

  return (
    <View
      style={containerStyle}
      ref={parentRef as React.MutableRefObject<View>}
      {...hoverEventBindings}
      {...baseLayoutBindings}
    >
      {children}
      <TooltipContent
        show={shouldShowContent}
        {...tooltipContentProps}
        baseWidth={baseLayout.width}
      />
    </View>
  );
}

function TooltipContent(
  props: { show: boolean; baseWidth: number } & TooltipContentProps
) {
  const {
    content,
    variant = 'normal',
    position = 'top',
    contentZIndex,
    width = 'auto',
    offset,
    show,
    baseWidth,
    testID,
  } = props;
  const contentWidth = width === 'stretchToChild' ? baseWidth : width;
  const variantColor = getVariantColor(variant);
  const [wrapperStyle, arrowStyle, cardOffsetStyle] =
    getPositionVariantStyle(position);

  return (
    <View
      testID={testID}
      style={[
        styles.wrapper,
        {
          width: contentWidth,
          opacity: Number(show),
        },
        calculateOffset(position, offset, show),
        wrapperStyle,
        getAbsoluteStyle(position, contentZIndex),
      ]}
    >
      <View style={[styles.arrow, arrowStyle, { borderColor: variantColor }]} />
      <View
        style={[
          styles.tooltipCard,
          cardOffsetStyle,
          { backgroundColor: variantColor },
        ]}
      >
        {isReactText(content) && (
          <Text ink="light" style={styles.tooltipText}>
            {content}
          </Text>
        )}
        {!isReactText(content) && content}
      </View>
    </View>
  );
}

/*************************************/
/**                                 **/
/** Dynamic style builder functions **/
/**                                 **/
/*************************************/

// Determine content is a ReactText, they should not be a direct children of Card
// Card use View as the wrapper component
function isReactText(content: React.ReactNode): content is React.ReactText {
  return typeof content === 'number' || typeof content === 'string';
}

// Determine the transformation styling should be used in
// animating the tooltip when shown or hidden (slide value).
// takes the position variant, the offset (distance from an edge).
function calculateOffset(
  position: Position,
  offset: Props['offset'],
  show: boolean
) {
  const translate = { x: 0, y: 0 };
  const visibilityOffset = show ? 0 : Token.spacing.m;
  const defaultDistance = Token.spacing.xxs + visibilityOffset;

  switch (position) {
    case 'top':
      translate.y = -defaultDistance;
      break;
    case 'right':
      translate.x = defaultDistance;
      break;
    case 'bottom':
      translate.y = defaultDistance;
      break;
    case 'left':
    default:
      translate.x = -defaultDistance;
      break;
  }

  const { x = 0, y = 0 } = offset || {};

  return {
    transform: [
      { translateX: translate.x + x },
      { translateY: translate.y - y },
    ],
  };
}

// Takes position to determine vertical or horizontal centering on Tooltip content
// Takes zIndex, see TooltipContentProps
function getAbsoluteStyle(position?: Position, zIndex?: number) {
  const style: ViewStyle = {};

  switch (position) {
    case 'left':
    case 'right':
      style.flexDirection = 'row';
      break;
    default:
      style.flexDirection = 'column';
      break;
  }

  if (typeof zIndex === 'number') {
    style.zIndex = zIndex;
  }

  return style;
}

// get variant color, returns the color based on current theme
function getVariantColor(variant: TooltipVariant) {
  if (variant === 'alert') {
    return Token.colors.red;
  }

  return Token.colors.blue;
}

// Determine all needed style based on position preference (top/right/bottom/left)
// takes the position variant
// Ordered by [wrapper, arrow, cardOffset]
function getPositionVariantStyle(position: Position): ViewStyle[] {
  switch (position) {
    case 'top':
      return [styles.wrapperTop, styles.arrowTop, styles.cardOffsetTop];
    case 'right':
      return [styles.wrapperRight, styles.arrowRight, styles.cardOffsetRight];
    case 'bottom':
      return [
        styles.wrapperBottom,
        styles.arrowBottom,
        styles.cardOffsetBottom,
      ];
    case 'left':
    default:
      return [styles.wrapperLeft, styles.arrowLeft, styles.cardOffsetLeft];
  }
}

/*******************/
/**               **/
/** Static styles **/
/**               **/
/*******************/

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'center',
    position: 'absolute',
    // @ts-ignore
    transitionProperty: 'transform, opacity',
    transitionDuration: `${Token.animation.timing.instant}ms`,
  },
  wrapperTop: {
    bottom: '100%',
  },
  wrapperRight: {
    left: '100%',
  },
  wrapperBottom: {
    top: '100%',
  },
  wrapperLeft: {
    right: '100%',
  },
  arrow: {
    zIndex: -1,
    position: 'absolute',
    width: 0,
    height: 0,
    borderWidth: 8,
    borderRadius: 2,
  },
  arrowTop: {
    left: '50%',
    bottom: 0,
    // @ts-ignore
    transformOrigin: 'bottom left',
    transform: [{ rotate: '-45deg' }],
  },
  arrowRight: {
    top: '50%',
    // @ts-ignore
    transformOrigin: 'top left',
    transform: [{ rotate: '-45deg' }],
  },
  arrowBottom: {
    left: '50%',
    // @ts-ignore
    transformOrigin: 'top left',
    transform: [{ rotate: '45deg' }],
  },
  arrowLeft: {
    top: '50%',
    right: 0,
    // @ts-ignore
    transformOrigin: 'top right',
    transform: [{ rotate: '45deg' }],
  },
  cardOffsetTop: {
    marginBottom: Token.spacing.xs,
  },
  cardOffsetRight: {
    marginLeft: Token.spacing.xs,
  },
  cardOffsetBottom: {
    marginTop: Token.spacing.xs,
  },
  cardOffsetLeft: {
    marginRight: Token.spacing.xs,
  },
  tooltipCard: {
    paddingHorizontal: Token.spacing.s,
    paddingVertical: Token.spacing.xs,
    borderRadius: Token.border.radius.default,
  },
  tooltipText: {
    textAlign: 'center',
  },
});
