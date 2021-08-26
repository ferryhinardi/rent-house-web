import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { LoadingIndicator } from 'core/base';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { spacing, colors, border } from './Token';
import Text from './Text';

type Props = React.ComponentProps<typeof Pressable> & {
  IconStart?: string | React.ReactElement;
  loading?: boolean;
  text: string;
  variant?: 'primary' | 'secondary' | 'empty' | 'outline';
};

function Button({
  text,
  variant = 'primary',
  style,
  IconStart,
  loading = false,
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
        backgroundColor: 'rgba(245, 192, 16, 0.4)', // colors.lightGold with opacity 0.4
      };
      break;
    case 'empty':
      buttonStyle = {
        backgroundColor: colors.white,
        borderColor: '#D0D0D0',
        borderWidth: 3,
      };
      break;
    case 'outline':
      buttonStyle = {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      };
      break;
  }

  return (
    <Pressable
      {...restProps}
      style={StyleSheet.flatten([styles.container, style, buttonStyle])}
    >
      {typeof IconStart === 'string' ? (
        <View style={styles.wrapperIcon}>
          <Icon name={IconStart} size={16} />
        </View>
      ) : (
        <View style={styles.wrapperIcon}>{IconStart}</View>
      )}
      {loading ? (
        <LoadingIndicator color={colors.white} />
      ) : (
        <Text ink={textInk}>{text}</Text>
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
  wrapperIcon: { marginRight: spacing.xs },
});

export default Button;
