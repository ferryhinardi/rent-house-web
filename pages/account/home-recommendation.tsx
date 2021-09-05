import React from 'react';
import {
  Head,
  HeaderMenu,
  HomeRecommendationHeaderSection,
  HomeOurRecommendationSection,
  PreferenceBanner,
  Footer,
} from 'components';

export default function HomeRecommendation() {
  return (
    <>
      <Head />
      <HeaderMenu />
      <HomeRecommendationHeaderSection />
      <HomeOurRecommendationSection />
      <PreferenceBanner />
      <Footer />
    </>
  );
}
