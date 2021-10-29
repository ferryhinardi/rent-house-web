import { Head, HeaderMenu, PreferenceBanner, Footer, StaticPageBanner } from 'components';
import { Text, ContainerDesktop } from 'core/base';
import { StyleSheet } from 'react-native';
import { Token } from 'core';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div>
      <Head />
      <HeaderMenu />
      <StaticPageBanner title={t('aboutUs')} />
      <ContainerDesktop style={styles.container}>
        <Text ink="dark" font="playfair" variant="header-3">
          WHO WE ARE
        </Text>
        <br />
        <br />
        <Text ink="dark" variant="large">
          Ryna is a co-living and apartment rental platform that leverages technology to make renting easier and safer
          for people who identify as women, while giving them the proper tools to pave their own path and build a life
          they love.
        </Text>

        <br />
        <br />

        <Text ink="dark" font="playfair" variant="header-3">
          OUR STORY
        </Text>
        <br />
        <br />
        <Text ink="dark" variant="large">
          Many women in their early, mid, and late-twenties/thirties are looking for a place due to common factors.
          Women are transitioning into new careers, new cities, new stages of life, getting out of a breakup, getting
          out of a bad roommate situation, moving because their roomies are moving in with their partners…
          <br />
          <br />
          But finding a place in the city can be daunting, unsafe, and a whole job in and of itself. It can be hard to
          find what you&apos;re looking for - affordability, nice space, location, roommates, etc. Women have it hard
          enough as it is, without enough credit.
        </Text>

        <br />
        <br />

        <Text ink="dark" font="playfair" variant="header-3">
          OUR MISSION
        </Text>
        <br />
        <br />
        <Text ink="dark" variant="large">
          We empower to women to pave their own independent path and create a life they love.
        </Text>

        <br />
        <br />

        <Text ink="dark" font="playfair" variant="header-3">
          OUR VISION
        </Text>
        <br />
        <br />
        <Text ink="dark" variant="large">
          Where everyone can find their tribe.
        </Text>
      </ContainerDesktop>
      <PreferenceBanner />
      <Footer />
      <style jsx global>{`
        #__next {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Token.spacing.xxm,
    marginBottom: Token.spacing.xxm,
  },
});
