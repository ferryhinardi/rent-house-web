import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import config from 'config';
import { Token, fetcher } from 'core';
import { QUERY_KEYS } from 'core/constants';
import { Text, Button } from 'core/base';
import { EasyProcessPlaceholder } from 'components/Placeholder';
import { Process, ResponseItem } from 'types';

import assets from 'assets';

export default function EasyProcess() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery<ResponseItem<Process>>(
    QUERY_KEYS.PROCESS,
    async () => {
      const res = await fetcher<ResponseItem<Process>>({
        method: 'GET',
        url: '/process',
      });
      return res;
    }
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text ink="primary" variant="header-2" style={styles.headerTitle}>
            {t('titleEasyProcess')}
          </Text>
          <Text variant="caption">{t('subtitleEasyProcess')}</Text>
        </View>
        {/* <Button variant="secondary" text={t('moreButtonEasyProcess')} /> */}
      </View>
      {isLoading ? (
        <EasyProcessPlaceholder />
      ) : (
        <View style={styles.containerProcess}>
          {data?.data.map((process) => (
            <View key={process.id} style={styles.processWrapper}>
              <View style={styles.headerProcess}>
                <Image
                  src={`${config.imageHost}/${process.image}`}
                  blurDataURL={`${config.imageHost}/${process.image}`}
                  placeholder="blur"
                  loading="lazy"
                  width="100%"
                  height={34}
                  alt={process.title}
                />
                <Text variant="header-3" style={styles.headerText}>
                  {process.title}
                </Text>
              </View>
              <Text style={styles.processDescription}>
                {process.description}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.horizontalLineContainer1}>
        <Image src={assets.homeLineHorizontal4} />
      </View>
      <View style={styles.horizontalLineContainer2}>
        <Image src={assets.homeLineHorizontal5} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Token.spacing.xxxxl,
    zIndex: 2,
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Token.spacing.m,
  },
  headerTitle: {
    marginBottom: Token.spacing.xs,
  },
  containerProcess: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Token.spacing.xxl,
    justifyContent: 'space-between',
    marginVertical: Token.spacing.xxxl,
  },
  processWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '30%',
    maxWidth: '22vw',
  },
  headerProcess: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: Token.spacing.ml,
  },
  processDescription: {
    marginTop: Token.spacing.m,
  },
  horizontalLineContainer1: {
    width: '40vw',
    right: -30,
    bottom: -150,
    position: 'absolute',
    transform: [
      {
        rotate: '-5deg',
      },
    ],
  },
  horizontalLineContainer2: {
    width: '70vw',
    right: 0,
    bottom: -50,
    position: 'absolute',
    height: 150,
  },
});
