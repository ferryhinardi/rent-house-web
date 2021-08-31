import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  Head,
  HeaderMenu,
  HeaderNavigation,
  SideBar,
  PreferenceContent,
  Footer,
} from 'components';
import { Token } from 'core';
import { Text } from 'core/base';

export default function Preference() {
  const { t } = useTranslation();
  return (
    <div>
      <Head />
      <HeaderMenu />
      <View style={styles.container}>
        <HeaderNavigation title={t('preference')} />
        <View style={styles.contentWrapper}>
          <SideBar
            menus={[
              {
                name: 'premilinary-questions',
                label: 'Premilinary Questions',
                IconRight: (
                  <Icon
                    name="check-circle"
                    size={20}
                    color={Token.colors.rynaBlue}
                  />
                ),
              },
              {
                name: 'roommate',
                label: 'Roommate',
                IconRight: (
                  <Text variant="sidebar-menu" ink="primary">{`0/2`}</Text>
                ),
              },
              {
                name: 'about-you',
                label: 'A bit about you',
                IconRight: (
                  <Text variant="sidebar-menu" ink="primary">{`0/1`}</Text>
                ),
              },
              {
                name: 'moving-reason',
                label: 'Moving Reason',
                IconRight: (
                  <Text variant="sidebar-menu" ink="primary">{`0/1`}</Text>
                ),
              },
              {
                name: 'amenities',
                label: 'Amenities',
                IconRight: (
                  <Text variant="sidebar-menu" ink="primary">{`0/3`}</Text>
                ),
              },
            ]}
            style={{ flex: 0.4, width: '100%' }}
          />
          <PreferenceContent />
        </View>
      </View>
      <Footer />
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Token.spacing.xxxxl,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: Token.spacing.xxl,
  },
});
