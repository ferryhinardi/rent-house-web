import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
  Head,
  HeaderMenu,
  HeaderNavigation,
  HomeDetailContent,
  Footer,
} from 'components';
import { ContainerDesktop } from 'core/base';

export default function HomeDetail() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const title = t('homeDetailTitle', { homeName: query.homeId });
  return (
    <div>
      <Head />
      <HeaderMenu />
      <ContainerDesktop>
        <HeaderNavigation title={title} subtitle={t('homeDetailSubtitle')} />
        <HomeDetailContent />
      </ContainerDesktop>
      <Footer />
    </div>
  );
}
