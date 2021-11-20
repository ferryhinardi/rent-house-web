import React, { forwardRef, MutableRefObject, useImperativeHandle, useRef } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableWithoutFeedback,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';

import { spacing, border, typography, colors } from './Token';

import {
  useCSSHoverFocusTransition,
  HoverFocusEventHandlers,
  HoverFocusBehaviorStyleMap,
} from '../hooks/useCSSTransition';

export type Props = {
  /**
   *  @default 'formal'
   */
  variant?: 'formal' | 'minimal' | 'text-area';
  /**
   *  @default false
   */
  error?: boolean;
  /**
   *  @default false
   */
  disabled?: boolean;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  onMouseEnter?: () => void;
  onMouseOut?: () => void;
  inputRef?: MutableRefObject<TextInput>;
  labelId?: string;
  name?: string;
  helperId?: string;
  errorMessageId?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  rightLabel?: React.ReactElement;
} & TextInputProps;

function Input(props: Props) {
  const {
    variant = 'formal',
    error,
    disabled,
    iconLeft,
    iconRight,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseOut,
    labelId,
    helperId,
    errorMessageId,
    inputRef,
    containerStyle,
    textInputStyle,
    onChange,
    editable = true,
    rightLabel,
    ...textInputProps
  } = props;
  const EnforcedIconLeft = iconLeft ? enforceIconSizingLeft(iconLeft) : null;
  const EnforcedIconRight = iconRight ? enforceIconSizingRight(iconRight) : null;

  const EnforcePostLabel = !!rightLabel;

  const textInputRef = useRef<TextInput>();
  const {
    hoverEventHandlers,
    focusEventHandlers,
    style: backdropStyle,
  } = useBackdropStyle(variant, disabled ? 'disabled' : error ? 'error' : 'normal', {
    onMouseEnter,
    onMouseOut,
    onFocus,
    onBlur,
  });
  const hoverHandlers = !disabled ? hoverEventHandlers : {};
  const focusHandlers = !disabled ? focusEventHandlers : {};
  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (variant === 'text-area') {
      // @ts-ignore
      e.target.style.height = 0;
      // @ts-ignore
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
    onChange?.(e);
  };

  useImperativeHandle(inputRef, () => textInputRef.current!);

  return (
    // @ts-ignore: adding `focusable={false}` to not add `tabIndex=0`
    <TouchableWithoutFeedback onPress={() => textInputRef.current && textInputRef.current.focus()}>
      <View
        style={[styles.boxDefaults, variant === 'minimal' ? styles.boxMinimal : styles.boxFormal, containerStyle]}
        {...hoverHandlers}>
        <View style={[styles.backdrop, backdropStyle]} />
        {EnforcedIconLeft && <View style={styles.iconLeft}>{EnforcedIconLeft}</View>}
        <TextInput
          {...textInputProps}
          {...focusHandlers}
          onChange={handleChange}
          ref={textInputRef as MutableRefObject<TextInput>}
          aria-labelledby={labelId}
          aria-describedby={error && errorMessageId ? errorMessageId : helperId}
          aria-invalid={error ? 'true' : 'false'}
          aria-errormessage={error ? errorMessageId : undefined}
          editable={!(disabled || !editable)}
          accessible={!disabled}
          style={[styles.input, textInputStyle, { color: disabled ? colors.grey : colors.dark }]}
          placeholderTextColor={colors.grey}
        />
        {EnforcedIconRight && <View style={styles.iconRight}>{EnforcedIconRight}</View>}
        {EnforcePostLabel && rightLabel}
      </View>
    </TouchableWithoutFeedback>
  );
}

function enforceIconSizingLeft(Icon: React.ReactElement) {
  return React.cloneElement(Icon, {
    width: spacing.l,
    height: spacing.l,
  });
}

function enforceIconSizingRight(Icon: React.ReactElement) {
  return React.cloneElement(Icon, {
    width: spacing.m,
    height: spacing.m,
  });
}

/********************************/
/********************************/
/*** Dynamic Styling Builder  ***/
/********************************/
/********************************/
type ValueState = 'normal' | 'error' | 'disabled';

const backdropBorderWidthMapFormal = {
  normal: border.width.thin,
  hovered: border.width.thin,
  focused: border.width.bold,
};

const backdropBorderWidthMapMinimal = {
  ...backdropBorderWidthMapFormal,
  focused: border.width.thick,
};

const backdropWidthMapFormal = {
  normal: `calc(100% - ${backdropBorderWidthMapFormal.normal * 2})`,
  hovered: `calc(100% - ${backdropBorderWidthMapFormal.hovered * 2})`,
  focused: `calc(100% - ${backdropBorderWidthMapFormal.focused * 2})`,
};

const backdropWidthMapMinimal = {
  normal: '100%',
  hovered: '100%',
  focused: '100%',
};

const backdropHeightMapFormal = {
  normal: `calc(100% - ${backdropBorderWidthMapFormal.normal * 2})`,
  hovered: `calc(100% - ${backdropBorderWidthMapFormal.hovered * 2})`,
  focused: `calc(100% - ${backdropBorderWidthMapFormal.focused * 2})`,
};

const backdropHeightMapMinimal = {
  normal: `calc(100% - ${backdropBorderWidthMapMinimal.normal})`,
  hovered: `calc(100% - ${backdropBorderWidthMapMinimal.hovered})`,
  focused: `calc(100% - ${backdropBorderWidthMapMinimal.focused})`,
};

export function useBackdropStyle(
  variant: Props['variant'],
  valueState: ValueState,
  customHandlers: HoverFocusEventHandlers
) {
  const borderColorKey = variant === 'minimal' ? 'borderBottomColor' : 'borderColor';
  const borderWidthKey = variant === 'minimal' ? 'borderBottomWidth' : 'borderWidth';

  const styleBehaviorMap: HoverFocusBehaviorStyleMap = {
    width: variant === 'minimal' ? backdropWidthMapMinimal : backdropWidthMapFormal,
    height: variant === 'minimal' ? backdropHeightMapMinimal : backdropHeightMapFormal,
    [borderColorKey]: {
      normal: colors.blue,
      hovered: colors.gold,
      focused: colors.fb,
      error: colors.red,
      disabled: colors.grey,
    },
    [borderWidthKey]: variant === 'minimal' ? backdropBorderWidthMapMinimal : backdropBorderWidthMapFormal,
  };
  let borderRadius: number = 0;

  const { hoverEventHandlers, focusEventHandlers, isFocused, style } = useCSSHoverFocusTransition(
    styleBehaviorMap,
    'normal',
    {},
    customHandlers
  );

  if (variant === 'formal') {
    borderRadius = border.radius.extra;
  } else if (variant === 'text-area') {
    borderRadius = border.radius.default;
  }

  return {
    hoverEventHandlers,
    focusEventHandlers,
    style: {
      ...style,
      width:
        valueState === 'normal'
          ? style.width
          : variant === 'minimal'
          ? backdropWidthMapMinimal.normal
          : backdropWidthMapFormal.normal,
      height:
        valueState === 'normal'
          ? style.width
          : variant === 'minimal'
          ? backdropHeightMapMinimal.normal
          : backdropHeightMapFormal.normal,
      [borderWidthKey]: valueState === 'normal' || isFocused ? style[borderWidthKey] : border.width.thin,
      [borderColorKey]:
        valueState === 'disabled'
          ? colors.blue // color.lightNeutral
          : isFocused
          ? style[borderColorKey]
          : valueState === 'error'
          ? colors.red
          : style[borderColorKey],
      // @ts-ignore
      transitionProperty: `${style.transitionProperty}, background-color`,
      // @ts-ignore
      willChange: `${style.willChange}, background-color`,
      backgroundColor: valueState === 'disabled' ? colors.white : colors.white,
      borderRadius,
    },
  };
}

/********************************/
/********************************/
/***      Default Styling     ***/
/********************************/
/********************************/
const styles = StyleSheet.create({
  boxDefaults: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFormal: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.m,
  },
  boxMinimal: {
    paddingVertical: spacing.xs,
  },
  backdrop: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  input: {
    flex: 1,
    fontSize: typography.Baseline.fontSize,
    lineHeight: typography.Baseline.lineHeight,
    outlineWidth: 0,
    outlineStyle: 'none',
    minWidth: 0,
  },
  iconLeft: {
    marginRight: spacing.xs,
  },
  iconRight: {
    marginLeft: spacing.xs,
  },
});

export default forwardRef<TextInput, Props>(function InputWithRef(props, ref) {
  // @ts-ignore
  return <Input {...props} inputRef={ref} />;
});
