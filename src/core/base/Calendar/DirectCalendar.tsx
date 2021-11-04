import { Token } from 'core';
import { Input, Text } from 'core/base';
import { useStable } from 'core/hooks';
import React from 'react';
import ReactCalendar, { OnChangeDateCallback } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { StyleSheet, View } from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';

type Props = Omit<React.ComponentProps<typeof Input>, 'onChange'> & {
  onChange?: (value: string) => void;
  customInitial?: string;
};

function DirectCalendar({ onChange, customInitial }: Props) {
  const formatter = useStable(
    () =>
      new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
  );
  const [value, setValue] = React.useState(customInitial ? new Date(customInitial) : new Date());

  const onChangeCalendar: OnChangeDateCallback = (value: Date) => {
    setValue(value);
    onChange?.(formatter.format(value));
  };

  return (
    <div>
      <ReactCalendar
        className="ryna-calendar"
        onChange={onChangeCalendar}
        value={value}
        nextLabel={<Icon name="chevron-right" color={Token.colors.rynaLink} />}
        next2Label={null}
        prevLabel={<Icon name="chevron-left" color={Token.colors.rynaLink} />}
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
    </div>
  );
}

const styles = StyleSheet.create({
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

export default DirectCalendar;
