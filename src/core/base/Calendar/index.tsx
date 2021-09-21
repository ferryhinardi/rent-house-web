import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useSpring, animated } from 'react-spring';
import ReactCalendar, {
  CalendarTileProperties,
  OnChangeDateCallback,
} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Token } from 'core';
import { Input, Text } from 'core/base';
import { useStable, useClickOutside } from 'core/hooks';

const AnimatedView = animated(View);
const calendarInputRef = React.createRef<TextInput | HTMLElement>();

type Props = React.ComponentProps<typeof Input> & {
  onSelectedDateCallback?: OnSelectedDateCallback;
};

export type OnSelectedDateCallback = (value: string) => void;

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
    props.onSelectedDateCallback?.(formatter.format(value));
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
            <ReactCalendar
              className="ryna-calendar"
              onChange={onChange}
              value={value}
              nextLabel={null}
              next2Label={null}
              prevLabel={null}
              prev2Label={null}
              tileClassName="ryna-calendar-tile"
              navigationLabel={(props) => {
                return (
                  <View style={styles.navigationMonthWrapper}>
                    <Text ink="link" style={styles.navigationMonthLabel}>
                      {props.label}
                    </Text>
                    <Icon name="chevron-down" color={Token.colors.rynaLink} />
                  </View>
                );
              }}
            />
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
  navigationMonthWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  navigationMonthLabel: {
    paddingRight: Token.spacing.xs,
  },
});

export default Calendar;
