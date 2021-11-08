import { Head, HeaderMenu } from 'components';
import { StyleSheet, Text, View } from 'react-native';
import { Token } from 'core';
import assets from 'assets';
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default function AboutUs() {
  return (
    <div>
      <Head />
      <View style={styles.wrapperHeader}>
        <HeaderMenu />
      </View>
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
          <div className="splashParalax"></div>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.socialMediaRow}>
          <a target="_blank" href="https://www.instagram.com/therynaofficial" rel="noopener noreferrer">
            <Icon name="instagram" size={42} />
          </a>
          <a target="_blank" href="https://www.facebook.com/therynaofficial" rel="noopener noreferrer">
            <Icon name="facebook" size={42} />
          </a>
          <a target="_blank" href="https://www.linkedin.com/company/ryna" rel="noopener noreferrer">
            <Icon name="linkedin" size={42} />
          </a>
        </View>
        <Text style={styles.copyRight}>{`© ${new Date().getFullYear()} by Ryna Living`}</Text>
        <Text style={styles.contactUs}>
          <a href="mailto:Hello@theRyna.com" role="normal" rel="noopener noreferrer">
            {'Hello@theRyna.com'}
          </a>
          {'   |  Tel: +1 647 370 1095'}
        </Text>
      </View>

      <style jsx>{`
        .splashParalax {
          width: 100%;
          height: 100%;
          background-image: url(${assets.splashScreenImage.src});
          /* Set a specific height */
          min-height: 500px;

          /* Create the parallax scrolling effect */
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 160,
  },
  column: {
    flex: 1,
    minHeight: 'auto',
  },
  wrapperHeader: {
    // @ts-ignore
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: Token.colors.white,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  },
  header: {
    paddingVertical: Token.spacing.xxxxxl,
    letterSpacing: 0.5,
    fontFamily: 'lato-light,lato,sans-serif',
    color: '#1C2B4F',
    fontSize: 41,
    lineHeight: 0,
    fontWeight: 'bold',
  },
  content: {
    fontFamily: 'futura-lt-w01-book,futura-lt-w05-book,sans-serif',
    color: '#1C2B4F',
    lineHeight: 28,
    fontSize: 19,
    fontWeight: '500',
  },
  footer: {
    paddingTop: Token.spacing.ml,
    alignItems: 'center',
  },
  socialMediaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // @ts-ignore
    gap: Token.spacing.ml,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyRight: {
    paddingVertical: Token.spacing.xs,
  },
  contactUs: {
    paddingBottom: Token.spacing.xxl,
  },
});
