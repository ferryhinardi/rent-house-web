import * as React from 'react';
import type {
  ViewProps,
  PressableProps as NativePressableProps,
  StyleProp,
  ViewStyle,
  PressableStateCallbackType,
} from 'react-native';
import {
  View,
  Pressable as NativePressable,
} from 'react-native';

const isServer =
  typeof process !== 'undefined' &&
  process.release &&
  process.release.name === 'node';

const hoverListener = createHoverListener();

interface PressableStateCallbackTypeWeb extends PressableStateCallbackType {
  focused?: boolean;
  hovered?: boolean;
}

type ChildrenType =
  | React.ReactNode
  | ((state: PressableStateCallbackTypeWeb) => React.ReactNode);

type StylesType =
  | StyleProp<ViewStyle>
  | ((state: PressableStateCallbackTypeWeb) => StyleProp<ViewStyle>);

interface HoverableProps extends ViewProps {
  children:
    | React.ReactNode
    | ((state: { hovered: boolean }) => React.ReactNode);
}

interface PressableProps extends Omit<NativePressableProps, 'style'> {
  children: ChildrenType;
  style?: StylesType;
}

type InteractionState = PressableStateCallbackTypeWeb;

export function Hoverable({ children, ...rest }: HoverableProps) {
  const hostRef = React.useRef<View | null>(null);
  const [hovered, setHovered] = React.useState<boolean>(false);

  React.useEffect(() => {
    const hr = hostRef.current;
    hoverListener.add(hr, setHovered);
    return () => {
      hoverListener.remove(hr);
    };
  }, [setHovered, hostRef]);

  return (
    <View
      ref={hostRef}
      {...rest}
    >
      {typeof children === 'function' ? children({ hovered }) : children}
    </View>
  );
}

function PressableWithoutRef(
  { style, children, ...rest }: PressableProps,
  forwardedRef: React.ForwardedRef<unknown>
) {
  const hostRef = React.useRef<unknown>(null);
  const [hovered, setHovered] = React.useState<boolean>(false);

  const setRef = setAndForwardRef({
    getForwardedRef: () => forwardedRef,
    setLocalRef: (hostNode: React.MutableRefObject<unknown>) => {
      hostRef.current = hostNode;
    },
  });

  React.useEffect(() => {
    const hr = hostRef.current;
    hoverListener.add(hr, setHovered);
    return () => {
      hoverListener.remove(hr);
    };
  }, [setHovered, hostRef]);

  return (
    <NativePressable
      //@ts-ignore
      ref={setRef}
      style={(interactionState: InteractionState) =>
        typeof style === 'function'
          ? style({ ...interactionState, hovered })
          : style
      }
      {...rest}
    >
      {(interactionState: InteractionState) =>
        typeof children === 'function'
          ? children({ ...interactionState, hovered })
          : children}
    </NativePressable>
  );
}

type ParentNode = React.ReactNode & {
  childNodes?: Array<React.ReactChild>
};

function containsEvent(parent: ParentNode, clickTarget: MouseEvent['target']) {
  if (parent === clickTarget) {
    return true;
  }
  if (!parent) {
    return false;
  }
  for (let child of (parent.childNodes || [])) {
    if (containsEvent(child, clickTarget)) {
      return true;
    }
  }
  return false;
}

function createHoverListener() {
  let hasMouse = isServer ? false : window.matchMedia('(pointer:fine)').matches;

  let refs = new Map<MouseEvent['target'] | unknown, React.Dispatch<React.SetStateAction<boolean>>>();
  let previousHoverFunc: undefined | React.Dispatch<React.SetStateAction<boolean>>;
  let mousePosition = {
    x: 0,
    y: 0,
  };

  function hover(target: MouseEvent['target']) {
    // hover is targeted directly
    let hoverFunc = refs.get(target);

    // let's try to see if any of the children of the hover event are hovered
    if (!hoverFunc) {
      // @ts-ignore
      for (const r of refs.keys()) {
        if (containsEvent(r, target)) {
          hoverFunc = refs.get(r);
        }
      }
    }

    previousHoverFunc && previousHoverFunc(false);
    hoverFunc && hoverFunc(true);

    // cache the previous hover so we can un-hover this later on
    previousHoverFunc = hoverFunc;
  }

  function hoverEvent(event: MouseEvent) {
    hover(event.target);
  }

  function unhover() {
    previousHoverFunc && previousHoverFunc(false);
  }

  function captureMousePosition(event: MouseEvent) {
    mousePosition.x = event.pageX;
    mousePosition.y = event.pageY;
  }

  // touch devices have a bug where the onMouseOver is handled while it should not
  // if the user would click something it keeps hovered while it should unhover
  // so only listen to these events if the device has a mouse
  if (hasMouse) {
    document.onmouseover = hoverEvent;
    document.onmousemove = captureMousePosition;
    document.ontouchstart = unhover;
    document.ontouchend = unhover;
    document.ontouchcancel = unhover;
    document.ontouchmove = unhover;
  }

  function add(ref: unknown, setHovered: React.Dispatch<React.SetStateAction<boolean>>) {
    refs.set(ref, setHovered);
  }

  function remove(ref: unknown) {
    refs.delete(ref);
  }

  return {
    add,
    remove,
    mousePosition,
    hover,
  };
}

type SetAndForwardRef = {
  getForwardedRef: () => React.ForwardedRef<unknown>,
  setLocalRef: (ref: React.MutableRefObject<unknown>) => void;
};

function setAndForwardRef({ getForwardedRef, setLocalRef }: SetAndForwardRef) {
  return function forwardRef(ref: React.MutableRefObject<typeof View>) {
    const forwardedRef = getForwardedRef();
    setLocalRef(ref);

    // Forward to user ref prop (if one has been specified)
    if (typeof forwardedRef === 'function') {
      // Handle function-based refs. String-based refs are handled as functions.
      forwardedRef(ref);
    } else if (typeof forwardedRef === 'object' && forwardedRef != null) {
      // Handle createRef-based refs
      forwardedRef.current = ref;
    }
  };
}

export const Pressable = React.forwardRef(PressableWithoutRef);
