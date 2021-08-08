import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

function HeadSEO() {
  const { t } = useTranslation();
  return (
    <Head>
      <title key="title">{t('metaTitle')}</title>
      <meta key="og:title" content={t('metaTitle')} property="og:title" />
      <meta key="description" content={t('metaDescription')} name="description" />
      <meta key="og:description" content={t('metaDescription')} property="og:description" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default HeadSEO;
