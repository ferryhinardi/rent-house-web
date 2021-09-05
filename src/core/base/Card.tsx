import React, { useContext } from 'react';
import Image, { ImageProps } from 'next/image';
import { View, TouchableOpacity, StyleSheet, ViewProps } from 'react-native';
import { colors, border, spacing } from './Token';
import Text from './Text';

interface Props extends ViewProps {
  orientation?: 'landscape' | 'portrait';
  imageProps?: ImageProps;
  children?: React.ReactNode;
  onPress?: () => void;
}

const CardContext = React.createContext<{
  orientation?: 'landscape' | 'portrait';
}>({});

function Card({ style, imageProps, orientation, onPress, children }: Props) {
  const Wrapper = !!onPress ? TouchableOpacity : View;
  return (
    <CardContext.Provider value={{ orientation }}>
      {/* @ts-ignore */}
      <Wrapper
        activeOpacity={0.8}
        style={[
          styles.container,
          style,
          orientation === 'landscape'
            ? { flexDirection: 'row' }
            : { flexDirection: 'column' },
        ]}
        onPress={onPress}
      >
        {imageProps && (
          <Image
            {...imageProps}
            className="banner-card"
            objectFit="cover"
            alt="image card"
          />
        )}
        {children}
      </Wrapper>
      <style jsx global>{`
        .banner-card {
          border-top-right-radius: 50px;
        }
      `}</style>
    </CardContext.Provider>
  );
}

function CardTitle(props: React.ComponentProps<typeof Text>) {
  return <Text {...props} variant="header-3" />;
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
    shadowOffset: { width: 20, height: 14 },
    shadowRadius: 84,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
  },
});

Card.Title = CardTitle;
Card.Body = CardBody;

export default Card;
