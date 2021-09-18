import React from 'react';
import { StyleSheet, View, Pressable, TextStyle } from 'react-native';
import { LoadingIndicator } from 'core/base';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { spacing, colors, border } from './Token';
import Text from './Text';

type Props = React.ComponentProps<typeof Pressable> & {
  IconStart?: string | React.ReactElement;
  loading?: boolean;
  text?: string;
  variant?: 'primary' | 'secondary' | 'empty' | 'outline';
  elevation?: boolean;
  disabled?: boolean;
  textStyle?: TextStyle;
  borderColor?: string;
};

function Button({
  text,
  variant = 'primary',
  style,
  IconStart,
  loading = false,
  elevation,
  disabled,
  borderColor,
  textStyle,
  ...restProps
}: Props) {
  let buttonStyle = {},
    textInk: React.ComponentProps<typeof Text>['ink'];

  switch (variant) {
    case 'primary':
    default:
      buttonStyle = { backgroundColor: colors.blue };
      textInk = 'light';
      break;
    case 'secondary':
      buttonStyle = {
        backgroundColor: 'rgba(245, 192, 16, 0.4)', // colors.rynaYellow with opacity 0.4
      };
      break;
    case 'empty':
      buttonStyle = {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      };
      textInk = 'dark';
      break;
    case 'outline':
      buttonStyle = {
        backgroundColor: colors.white,
        borderColor: borderColor || '#D0D0D0',
        borderWidth: 3,
        opacity: disabled ? 0.4 : 1,
      };
      break;
  }

  return (
    <Pressable
      {...restProps}
      disabled={disabled}
      style={StyleSheet.flatten([
        styles.container,
        elevation && styles.elevation,
        style,
        buttonStyle,
      ])}
    >
      {IconStart && (
        <View style={styles.wrapperIcon}>
          {typeof IconStart === 'string' ? (
            <Icon name={IconStart} size={16} />
          ) : (
            IconStart
          )}
        </View>
      )}
      {loading ? (
        <LoadingIndicator color={colors.white} />
      ) : (
        <Text style={textStyle} ink={textInk}>
          {text}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: border.radius.extra,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.xxm,
  },
  elevation: {
    shadowOffset: { width: 7, height: 9 },
    shadowRadius: 44,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
  },
  wrapperIcon: { marginHorizontal: spacing.xs },
});

export default Button;
