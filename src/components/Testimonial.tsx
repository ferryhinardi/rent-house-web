import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { fetcher, Token } from 'core';
import { ContainerDesktop, Text, Button, Card } from 'core/base';
import { QUERY_KEYS } from 'core/constants';
import { ResponseItem, Testimony } from 'types';
import { useQuery } from 'react-query';

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_HOST;

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

  if (isLoading) return  <Text>{'Loading...'}</Text>;

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
        renderItem={({item}) => {
          return (
            <Card
            key={item.id}
            orientation="landscape"
            style={styles.cardStyle}
            imageProps={{
              src: `${BASE_IMAGE_URL}/${item.user.profile_picture}`,
              blurDataURL: `${BASE_IMAGE_URL}/${item.user.profile_picture}`,
              placeholder: 'blur',
              loading: 'lazy',
              width: 300,
              height: 180,
              alt: 'testimony profile image',
              onError: () => console.error('error render image'),
            }}
          >
            <Card.Body style={{width:400}}>
              <Card.Title>{item.user.name+' | '+item.user.occupation}</Card.Title>
              <Text style={{ marginTop: Token.spacing.m}}>
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
    height:400,
    backgroundColor:Token.colors.lightGrey,
  },
  listContainer:{
    backgroundColor:Token.colors.lightGrey,
    
  },
  itemWrapperStyle: {
    paddingHorizontal: Token.spacing.l,
    alignSelf: 'flex-start',
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
    margin: 20,
    height:'100%',
    width:'100%',
    filter: '',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    shadowColor: 'rgba(0, 0, 0, 0)',
  },
});
