import React from 'react';
import HeadNextJs from 'next/head';
import { useTranslation } from 'react-i18next';


// // Generate required css
// import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// const iconFontStyles = `@font-face {
//   src: url(${iconFont});
//   font-family: FontAwesome;
// }`;

// // Create stylesheet
// const style = document.createElement('style');
// style.type = 'text/css';
// if (style.styleSheet) {
//   style.styleSheet.cssText = iconFontStyles;
// } else {
//   style.appendChild(document.createTextNode(iconFontStyles));
// }

// // Inject stylesheet
// document.head.appendChild(style);

function Head() {
  const { t } = useTranslation();
  return (
    <HeadNextJs>
      <title key="title">{t('metaTitle')}</title>
      <meta key="og:title" content={t('metaTitle')} property="og:title" />
      <meta key="description" content={t('metaDescription')} name="description" />
      <meta key="og:description" content={t('metaDescription')} property="og:description" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </HeadNextJs>
  );
}

export default Head;
