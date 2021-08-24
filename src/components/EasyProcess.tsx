import React from 'react';
import Image from 'next/image';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Token } from 'core';
import { ContainerDesktop, Text, Button } from 'core/base';
const processes = [
  { key: 'process1', icon: require('assets/pen-outline.svg') },
  { key: 'process2', icon: require('assets/calendar-outline.svg') },
  { key: 'process3', icon: require('assets/hause-outline.svg') },
];

export default function EasyProcess() {
  const { t } = useTranslation();
  return (
    <View>
      <ContainerDesktop style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text variant="header-2" style={styles.headerTitle}>
              {t('titleEasyProcess')}
            </Text>
            <Text>{t('subtitleEasyProcess')}</Text>
          </View>
          <Button variant="secondary" text={t('moreButtonEasyProcess')} />
        </View>
        <View style={styles.containerProcess}>
          {processes.map((process) => (
            <View key={process.key} style={styles.processWrapper}>
              <View style={styles.headerProcess}>
                <Image src={process.icon} alt={process.key} />
                <Text variant="header-3" style={styles.headerText}>
                  {t(`${process.key}Title`)}
                </Text>
              </View>
              <Text style={styles.processDescription}>
                {t(`${process.key}Description`)}
              </Text>
            </View>
          ))}
        </View>
      </ContainerDesktop>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Token.spacing.xxl,
  },
  header: {
    flexDirection: 'row',
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
    justifyContent: 'space-around',
    marginTop: Token.spacing.xxxl,
  },
  processWrapper: {
    flex: 0.3,
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
});
