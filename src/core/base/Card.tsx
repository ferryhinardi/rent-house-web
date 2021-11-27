import React, { useContext } from 'react';
import Image, { ImageProps } from 'next/image';
import { View, TouchableOpacity, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { colors, border, spacing } from './Token';
import Text from './Text';

interface Props extends ViewProps {
  orientation?: 'landscape' | 'portrait';
  imageProps?: ImageProps;
  children?: React.ReactNode;
  activeOpacity?: number;
  onPress?: () => void;
  noShadow?: boolean;
  imageContainerStyle?: ViewStyle;
  roundedCorner?: RoundedCorner[];
}

type RoundedCorner = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

const CardContext = React.createContext<{
  orientation?: 'landscape' | 'portrait';
}>({});

function Card({
  style,
  imageProps,
  orientation,
  onPress,
  children,
  activeOpacity,
  noShadow,
  imageContainerStyle,
  roundedCorner,
}: Props) {
  const Wrapper = !!onPress ? TouchableOpacity : View;

  const cornerStyle: ViewStyle = {};
  if (roundedCorner) {
    roundedCorner?.map((corner) => {
      switch (corner) {
        case 'topLeft':
          cornerStyle.borderTopLeftRadius = border.radius.extra;
          break;
        case 'topRight':
          cornerStyle.borderTopRightRadius = border.radius.extra;
          break;
        case 'bottomLeft':
          cornerStyle.borderBottomLeftRadius = border.radius.extra;
          break;
        case 'bottomRight':
          cornerStyle.borderBottomRightRadius = border.radius.extra;
          break;
        default:
          break;
      }
    });
  } else {
    cornerStyle.borderRadius = border.radius.default;
  }

  return (
    <CardContext.Provider value={{ orientation }}>
      {/* @ts-ignore */}
      <Wrapper
        activeOpacity={activeOpacity ? activeOpacity : 0.8}
        style={[
          styles.container,
          noShadow ? {} : styles.shadowContainer,
          cornerStyle,
          style,
          orientation === 'landscape' ? { flexDirection: 'row' } : { flexDirection: 'column' },
        ]}
        onPress={onPress}>
        {imageProps && (
          <View style={[styles.imageContainer, imageContainerStyle]}>
            <Image {...imageProps} className="banner-card" objectFit="cover" alt="image card" />
          </View>
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
  return <Text variant="header-2" {...props} />;
}

function CardBody(props: React.ComponentProps<typeof View> & { children: React.ReactNode }) {
  const { orientation } = useContext(CardContext);

  return <View {...props} style={[props.style, orientation ? { padding: spacing.xl } : { padding: spacing.l }]} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    filter: 'drop-shadow(8px 16px 94px rgba(0, 0, 0, 0.04))',
  },
  shadowContainer: {
    shadowOffset: { width: 20, height: 14 },
    shadowRadius: 84,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
  },
  imageContainer: {
    display: 'flex',
  },
});

Card.Title = CardTitle;
Card.Body = CardBody;

export default Card;
