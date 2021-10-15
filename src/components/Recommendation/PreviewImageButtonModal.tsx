import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Image from 'next/image';
import config from 'config';
import { Token } from 'core';
import { Text, Button, Modal } from 'core/base';
import Swiper from '../Swiper';

type Props = React.ComponentProps<typeof Button> & {
  images: string[];
};

export default function PreviewImageButtonModal({
  images,
  ...restProps
}: Props) {
  const [isVisible, onVisible] = useState(false);
  return (
    <>
      <Button
        {...restProps}
        variant="outline"
        onPress={() => onVisible(true)}
        borderColor="transparent"
      />
      <Modal
        animationType="fade"
        visible={isVisible}
        onRequestClose={() => onVisible(false)}
        onDismiss={() => onVisible(false)}
        noPadding
      >
        <Button
          IconStart="times"
          variant="empty"
          style={styles.close}
          onPress={() => onVisible(false)}
        />
        <View style={styles.modalContainer}>
          <Text variant="header-2" font="playfair" ink="primary">
            {'View All Photos'}
          </Text>
          <Text variant="caption" font="standard" ink="primary">
            {'of Ryna x Minto Apartement'}
          </Text>
          <View style={styles.imagePreview}>
            <Swiper
              containerStyle={{ flex: 1 }}
              innerContainerStyle={{ width: '100%', height: 378 }}
              minDistanceForAction={0.1}
              renderDots={(index: number, goTo: (index: number) => void) => (
                <Pressable key={index} onPress={() => goTo(index)}>
                  <Image
                    src={`${config.imageHost}/${images[index]}`}
                    blurDataURL={`${config.imageHost}/${images[index]}`}
                    placeholder="blur"
                    width={128}
                    height={128}
                    alt={`preview-galery`}
                    className="preview-thumbnail"
                    objectFit="cover"
                  />
                </Pressable>
              )}
              controlsProps={{
                dotsTouchable: true,
                prevPos: 'left',
                nextPos: 'right',
                dotsWrapperStyle: {
                  width: 100,
                  height: 100,
                },
                // eslint-disable-next-line
                NextComponent: ({ onPress }) => (
                  <Button
                    IconStart="chevron-right"
                    onPress={onPress}
                    variant="outline"
                    elevation
                    borderColor={Token.colors.white}
                    style={{
                      minWidth: 0,
                      width: 16,
                      height: 16,
                      paddingHorizontal: Token.spacing.m,
                    }}
                  />
                ),
                // eslint-disable-next-line
                PrevComponent: ({ onPress }) => (
                  <Button
                    IconStart="chevron-left"
                    onPress={onPress}
                    variant="outline"
                    elevation
                    borderColor={Token.colors.white}
                    style={{
                      minWidth: 0,
                      width: 16,
                      height: 16,
                      paddingHorizontal: Token.spacing.m,
                    }}
                  />
                ),
              }}
            >
              {images.map((image) => (
                <Image
                  key={image}
                  src={`${config.imageHost}/${image}`}
                  blurDataURL={`${config.imageHost}/${image}`}
                  placeholder="blur"
                  width={744}
                  height={378}
                  alt={`preview-galery`}
                  className="preview-image"
                  objectFit="cover"
                />
              ))}
            </Swiper>
          </View>
          <style jsx global>{`
            .preview-image {
              border-top-right-radius: 40px;
            }
            .preview-thumbnail {
              border-radius: 8px;
            }
          `}</style>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    padding: Token.spacing.l,
    alignItems: 'center',
  },
  close: {
    minWidth: 0,
    position: 'absolute',
    right: 0,
    zIndex: 1,
    paddingHorizontal: Token.spacing.xs,
  },
  imagePreview: {
    marginTop: Token.spacing.xl,
  },
});
