import React, { useContext } from 'react';
import Image, { ImageProps } from 'next/image';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors, border, spacing } from './Token';
import Text from './Text';

interface Props extends ViewProps {
  orientation?: 'landscape' | 'portrait';
  imageProps?: ImageProps;
  children: any;
}

const CardContext = React.createContext<{
  orientation?: 'landscape' | 'portrait';
}>({});

function Card({
  style,
  imageProps,
  orientation = 'landscape',
  ...restProps
}: Props) {
  return (
    <CardContext.Provider value={{ orientation }}>
      <View
        style={[
          styles.container,
          style,
          orientation === 'landscape'
            ? { flexDirection: 'row' }
            : { flexDirection: 'column' },
        ]}
      >
        {imageProps && (
          <Image
            {...imageProps}
            className="banner-card"
            objectFit="cover"
            alt="image card"
          />
        )}
        <View {...restProps} />
      </View>
      <style jsx global>{`
        .banner-card {
          border-top-right-radius: 50px;
        }
      `}</style>
    </CardContext.Provider>
  );
}

function CardTitle(props: React.ComponentProps<typeof Text>) {
  return <Text {...props} variant="header-title" />;
}

function CardBody(
  props: React.ComponentProps<typeof View> & { children: React.ReactNode }
) {
  const { orientation } = useContext(CardContext);

  return (
    <View
      {...props}
      style={[
        props.style,
        orientation ? { padding: spacing.xl } : { padding: spacing.l },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: border.radius.extra,
    filter: 'drop-shadow(8px 16px 94px rgba(0, 0, 0, 0.04))',
  },
});

Card.Title = CardTitle;
Card.Body = CardBody;

export default Card;
