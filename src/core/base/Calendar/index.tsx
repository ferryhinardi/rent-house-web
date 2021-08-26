import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useSpring, animated } from 'react-spring';
import ReactCalendar, { OnChangeDateCallback } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Token } from 'core';
import { Input } from 'core/base';
import { useStable, useClickOutside } from 'core/hooks';

const AnimatedView = animated(View);
const calendarInputRef = React.createRef<TextInput | HTMLElement>();

type Props = React.ComponentProps<typeof Input>;

function Calendar(props: Props) {
  const formatter = useStable(
    () =>
      new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
  );
  const [isVisibile, setIsVisible] = React.useState(false);
  const [isConstruct, setIsContruct] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  const calendarAnimateStyle = useSpring({
    opacity: isVisibile ? 1 : 0,
    onRest: () => (!isVisibile ? setIsContruct(false) : {}),
  });
  const onPress = () => {
    setIsContruct(true);
    setIsVisible((prev) => !prev);
  };
  const onHide = () => {
    setIsVisible(false);
  };
  const onChange: OnChangeDateCallback = (value: Date) => {
    setValue(value);
    onHide();
  };

  useClickOutside(
    calendarInputRef as React.MutableRefObject<HTMLElement>,
    onHide
  );

  return (
    <div>
      <Input
        {...props}
        ref={calendarInputRef as React.MutableRefObject<TextInput>}
        value={formatter.format(value)}
        editable={false}
        textInputStyle={styles.input}
        onFocus={onPress}
        onBlur={onHide}
      />
      {isConstruct && (
        <View style={styles.containerCalendar}>
          <AnimatedView
            // @ts-ignore
            style={calendarAnimateStyle}
          >
            <ReactCalendar onChange={onChange} value={value} />
          </AnimatedView>
        </View>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  input: {
    // @ts-ignore
    cursor: 'pointer',
  },
  containerCalendar: {
    position: 'absolute',
    marginTop: Token.spacing.xs,
    margin: 'auto 0px',
  },
});

export default Calendar;
