import { Animated, StyleProp, ViewStyle } from 'react-native';
import Controls from './Controls';

export type Props = Partial<{
  children: React.ReactNode;
  vertical: boolean;
  from: number;
  loop: boolean;
  timeout: number;
  gesturesEnabled: () => boolean;
  springConfig: Animated.SpringAnimationConfig;
  minDistanceToCapture: number;
  minDistanceForAction: number;

  onAnimationStart: (index: number) => void;
  onAnimationEnd: (index: number) => void;
  onIndexChanged: (index: number) => void;

  positionFixed: boolean; // Fix safari vertical bounce;
  containerStyle: StyleProp<ViewStyle>;
  innerContainerStyle: StyleProp<ViewStyle>;
  swipeAreaStyle: StyleProp<ViewStyle>;
  slideWrapperStyle: StyleProp<ViewStyle>;

  controlsEnabled: boolean;
  controlsProps: React.ComponentProps<typeof Controls>;
  Controls: React.ReactNode;

  theme: object;
}>;
