/* eslint-disable no-inner-declarations */
import React, { Component } from 'react';

let isHoverEnabled = false;

if (typeof window !== 'undefined') {
  const HOVER_THRESHOLD_MS = 1000;
  let lastTouchTimestamp = 0;

  // @ts-ignore
  function enableHover() {
    if (isHoverEnabled || Date.now() - lastTouchTimestamp < HOVER_THRESHOLD_MS) {
      return;
    }
    isHoverEnabled = true;
  }

  // @ts-ignore
  function disableHover() {
    lastTouchTimestamp = Date.now();
    if (isHoverEnabled) {
      isHoverEnabled = false;
    }
  }

  document.addEventListener('touchstart', disableHover, true);
  document.addEventListener('touchmove', disableHover, true);
  document.addEventListener('mousemove', enableHover, true);
}

export type Props = {
  /** Callback when mouse starts hovering over element */
  onMouseOver?: (e: React.SyntheticEvent) => any;
  /** Callback when mouse leaves the element */
  onMouseOut?: (e: React.SyntheticEvent) => any;
  /** Only accepts single child node */
  children: (isHovered: boolean) => JSX.Element;
};

type State = {
  isHovered: boolean;
  showHover: boolean;
};

type Action = 'responder' | 'press';
type EventType =
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onResponderGrant'
  | 'onResponderRelease'
  | 'onPressIn'
  | 'onPressOut';
type EventMap = { [key in EventType]: () => void };
export type HoverCallbacks = {
  onMouseEnter?: () => void;
  onMouseOut?: () => void;
};

export function useHoverable(callbacks: HoverCallbacks = {}) {
  const [isHovered, setHovered] = React.useState(false);
  const [showHover, setShowHover] = React.useState(true);
  const { onMouseEnter, onMouseOut } = callbacks;

  const handleMouseEnter = React.useCallback(() => {
    if (isHoverEnabled && !isHovered) {
      setHovered(true);
      onMouseEnter && onMouseEnter();
    }
  }, [isHoverEnabled, isHovered, onMouseEnter]);

  const handleMouseLeave = React.useCallback(() => {
    if (isHovered) {
      setHovered(false);
      onMouseOut && onMouseOut();
    }
  }, [isHovered, onMouseOut]);

  const handleGrant = React.useCallback(() => {
    setShowHover(false);
  }, []);

  const handleRelease = React.useCallback(() => {
    setShowHover(true);
  }, []);

  return [
    showHover && isHovered,
    {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onResponderGrant: handleGrant,
      onResponderRelease: handleRelease,
      onPressIn: handleGrant,
      onPressOut: handleRelease,
    },
  ] as [boolean, EventMap];
}

export default class Hoverable extends Component<Props, State> {
  state = {
    isHovered: false,
    showHover: true,
  };

  handleMouseEnter = (e: React.SyntheticEvent) => {
    if (isHoverEnabled && !this.state.isHovered) {
      const { onMouseOver } = this.props;
      if (onMouseOver) onMouseOver(e);
      this.setState({ isHovered: true });
    }
  };

  handleMouseLeave = (e: React.SyntheticEvent) => {
    if (this.state.isHovered) {
      const { onMouseOut } = this.props;
      if (onMouseOut) onMouseOut(e);
      this.setState({ isHovered: false });
    }
  };

  handleGrant = (child: JSX.Element, action: Action, ...args: any[]) => {
    this.setState({ showHover: false });

    if (action === 'responder') {
      child.props.onResponderGrant && child.props.onResponderGrant(...args);
    } else if (action === 'press') {
      child.props.onPressIn && child.props.onPressIn(...args);
    }
  };

  handleRelease = (child: JSX.Element, action: Action, ...args: any[]) => {
    this.setState({ showHover: true });

    if (action === 'responder') {
      child.props.onResponderRelease && child.props.onResponderRelease(...args);
    } else if (action === 'press') {
      child.props.onPressOut && child.props.onPressOut(...args);
    }
  };

  render() {
    const { children } = this.props;
    const child = children(this.state.showHover && this.state.isHovered);

    return React.cloneElement(React.Children.only(child), {
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      // prevent hover showing while responder
      onResponderGrant: this.handleGrant.bind(this, child, 'responder'),
      onResponderRelease: this.handleRelease.bind(this, child, 'responder'),
      // if child is Touchable
      onPressIn: this.handleGrant.bind(this, child, 'press'),
      onPressOut: this.handleRelease.bind(this, child, 'press'),
    });
  }
}
