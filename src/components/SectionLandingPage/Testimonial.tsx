import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import config from 'config';
import { fetcher, Token } from 'core';
import { ContainerDesktop, Text, Button, Card } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { TestimonyPlaceholder } from 'components/Placeholder';
import { ResponseItem, Testimony } from 'types';
import { useQuery } from 'react-query';

export default function Testimonial() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery<ResponseItem<Testimony>>(
    QUERY_KEYS.TESTIMONY,
    async () => {
      const res = await fetcher<ResponseItem<Testimony>>({
        method: 'GET',
        url: '/testimony',
      });
      return res;
    }
  );

  if (isLoading) return <TestimonyPlaceholder />;

  return (
    <ContainerDesktop style={styles.container}>
      <View style={styles.itemWrapperStyle}>
        <Text variant="header-2">{t('titleTestimonial')}</Text>
        <Text variant="caption" style={styles.subtitle}>
          {t('subtitleTestimonial')}
        </Text>
        <Button
          variant="secondary"
          text={t('moreButtonTestimonial')}
          style={styles.moreButtton}
        />
      </View>
      <FlatList
        keyExtractor={(_, idx) => `${idx}`}
        data={data?.data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.listContainer}
        renderItem={({ item }) => {
          return (
            <Card
              key={item.id}
              orientation="landscape"
              style={styles.cardStyle}
              imageProps={{
                src: `${config.imageHost}/${item.user.profile_picture}`,
                blurDataURL: `${config.imageHost}/${item.user.profile_picture}`,
                placeholder: 'blur',
                loading: 'lazy',
                layout: 'fill',
                alt: 'testimony profile image',
                onError: () => console.error('error render image'),
              }}
              imageContainerStyle={styles.cardImage}
              roundedCorner={['topLeft', 'bottomRight']}
            >
              <Card.Body style={{ width: 400 }}>
                <Text variant="header-4" font="playfair">
                  {item.user.name + ' | ' + item.user.job}
                </Text>
                <Text style={{ marginTop: Token.spacing.m }}>
                  {item.testimony_text}
                </Text>
              </Card.Body>
            </Card>
          );
        }}
      />
    </ContainerDesktop>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Token.spacing.xl,
    flexDirection: 'row',
    height: 400,
    backgroundColor: Token.colors.lightGrey,
  },
  listContainer: {
    padding: Token.spacing.m,
  },
  itemWrapperStyle: {
    paddingHorizontal: Token.spacing.l,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  subtitle: {
    marginTop: Token.spacing.m,
    marginBottom: Token.spacing.xxl,
  },
  moreButtton: {
    alignSelf: 'flex-start',
  },
  cardStyle: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '20%',
    marginHorizontal: Token.spacing.ml,
    height: '100%',
    width: '100%',
    filter: '',
    shadowOffset: { width: 10, height: 5 },
    shadowRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
  },
  cardImage: {
    height: '100%',
    width: 200,
    borderTopLeftRadius: Token.border.radius.extra,
    overflow: 'hidden',
  },
});
