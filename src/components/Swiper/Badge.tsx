import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';

type Props = Partial<{
  containerStyle: StyleProp<ViewStyle>;
  badgeStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<ViewStyle>;
  value: React.ReactNode;
  onPress: () => void;
  Component: React.ReactNode;
  status: 'primary' | 'success' | 'warning' | 'error';
}>;

export default function Badge({
  status = 'primary',
  containerStyle,
  textStyle,
  badgeStyle,
  onPress,
  Component = onPress ? TouchableOpacity : View,
  value,
  ...restProps
}: Props) {
  return (
    <View style={StyleSheet.flatten([containerStyle && containerStyle])}>
      {/* @ts-ignore */}
      <Component
        {...restProps}
        style={StyleSheet.flatten([
          styles.badge(status),
          !value && styles.miniBadge,
          badgeStyle && badgeStyle,
        ])}
        onPress={onPress}
      >
        <Text style={StyleSheet.flatten([styles.text, textStyle])}>
          {value}
        </Text>
      </Component>
    </View>
  );
}

const badgeColorMap: { [key: string]: string } = {
  primary: '#2089dc',
};

const size = 18;
const miniSize = 8;

const styles = {
  badge: (status: string) => ({
    alignSelf: 'center',
    minWidth: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: badgeColorMap[status],
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
  }),
  miniBadge: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    minWidth: miniSize,
    height: miniSize,
    borderRadius: miniSize / 2,
  },
  text: {
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 4,
  },
};
