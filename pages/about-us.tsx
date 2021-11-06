import { Head, HeaderMenu } from 'components';
import Image from 'next/image';
import { StyleSheet, Text, View } from 'react-native';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { Token } from 'core';
import assets from 'assets';

export default function AboutUs() {
  return (
    <ParallaxProvider>
      <Head />
      <HeaderMenu />
      <View style={styles.container}>
        <View style={[styles.column, { backgroundColor: 'rgba(255, 255, 254, 0.74)' }]}>
          <View
            style={{
              marginHorizontal: 'auto',
              maxWidth: '65%',
            }}>
            <Text style={styles.header}>WHO WE ARE</Text>
            <Text style={styles.content}>
              Ryna is a co-living and apartment rental platform that leverages technology to make renting easier and
              safer for people who identify as women, while giving them the proper tools to pave their own path and
              build a life they love.
            </Text>
            <Text style={styles.header}>OUR STORY</Text>
            <Text style={styles.content}>
              Many women in their early, mid, and late-twenties/thirties are looking for a place due to common factors.
              Women are transitioning into new careers, new cities, new stages of life, getting out of a breakup,
              getting out of a bad roommate situation, moving because their roomies are moving in with their partners…
            </Text>
            <Text style={[styles.content, { marginTop: Token.spacing.ml }]}>
              But finding a place in the city can be daunting, unsafe, and a whole job in and of itself. It can be hard
              to find what you&apos;re looking for - affordability, nice space, location, roommates, etc. Women have it
              hard enough as it is, without enough credit.
            </Text>
            <Text style={styles.header}>OUR MISSION</Text>
            <Text style={styles.content}>
              We empower to women to pave their own independent path and create a life they love.
            </Text>

            <Text style={styles.header}>OUR VISION</Text>
            <Text style={styles.content}>Where everyone can find their tribe.</Text>
          </View>
        </View>
        <View style={styles.column}>
          <Parallax className="custom-class" y={[0, 20]} tagOuter="figure">
            <Image className="splashImage" {...assets.splashScreenImage} placeholder="blur" objectFit="fill" />
          </Parallax>
        </View>
      </View>
    </ParallaxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    minHeight: 'auto',
  },
  header: {
    paddingVertical: Token.spacing.xxxxxl,
    letterSpacing: 0.5,
    verticalAlign: 'baseline',
    fontFamily: 'lato-light,lato,sans-serif',
    color: '#1C2B4F',
    fontSize: 41,
    lineHeight: 0,
  },
  content: {
    fontFamily: 'futura-lt-w01-book,futura-lt-w05-book,sans-serif',
    color: '#1C2B4F',
    fontSize: 19,
  },
});
