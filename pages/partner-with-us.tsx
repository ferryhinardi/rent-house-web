import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Image from 'next/image';
import { Head, HeaderMenu } from 'components';
import Footer from 'components/StaticPage/Footer';
import { ContainerDesktop } from 'core/base';
import { Token } from 'core';
import assets from 'assets';
import NextSubject from 'assets/NextSubject.svg';

export default function Home() {
  return (
    <div>
      <Head />
      <View style={styles.wrapperHeader}>
        <HeaderMenu />
      </View>
      <ContainerDesktop style={styles.container}>
        <View style={styles.containerTopContent}>
          <Text style={styles.header}>Achieve Higher Return With Us</Text>

          <View style={styles.wrapperAchivePoint}>
            <View style={styles.achivePointBullet}>
              <View style={styles.pointBullet}>
                <Text style={styles.pointPercentage}>30%+</Text>
                <Text style={styles.pointTitle}>Higher NOI</Text>
              </View>
              <Text style={styles.pointDescription}>
                Ryna provides operational services like cleaning, and on-call tenant support to unlock additional NOI.
              </Text>
            </View>

            <View style={styles.achivePointBullet}>
              <View style={[styles.pointBullet, { borderColor: Token.colors.gold }]}>
                <Text style={styles.pointPercentage}>290+</Text>
                <Text style={styles.pointTitle}>bps CAP Rate</Text>
              </View>
              <Text style={styles.pointDescription}>
                Our strategy identifies value-add opportunities by capitalizing on under-utilized space to increase the
                cap rate upon purchase.
              </Text>
            </View>

            <View style={styles.achivePointBullet}>
              <View style={styles.pointBullet}>
                <Text style={styles.pointPercentage}>97%</Text>
                <Text style={styles.pointTitle}>Occupancy</Text>
              </View>
              <Text style={styles.pointDescription}>
                Enjoy fast lease up and low vacancy due to hands-on leasing and daily engagement with members.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containerContent}>
          <Text
            accessibilityLabel="heading"
            // @ts-ignore
            accessibilityRole="heading"
            ariaLevel="1"
            style={styles.headerWithLine}>
            How we partner
          </Text>

          <View style={styles.processPartner}>
            <View style={styles.wrapperProcessTitle}>
              <Text style={styles.processTitle}>Send us project information</Text>
              <Text style={styles.processDescription}>
                Floor plans, building massing, financial models, offering memorandums, etc
              </Text>
            </View>
            <Image src={NextSubject} width={57} height={38} />
            <View style={styles.wrapperProcessTitle}>
              <Text style={styles.processTitle}>Ryna&apos;s evaluation</Text>
              <Text style={styles.processDescription}>
                Ryna will provide a detailed pro-forma and property analysis
              </Text>
            </View>
            <Image src={NextSubject} width={57} height={38} />
            <View style={styles.wrapperProcessTitle}>
              <Text style={styles.processTitle}>Sign agreement & lease up</Text>
              <Text style={styles.processDescription}>
                Ryna will also provide on-going tenant relationship management.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.containerContent}>
          <Text
            accessibilityLabel="heading"
            // @ts-ignore
            accessibilityRole="heading"
            ariaLevel="1"
            style={styles.headerWithLine}>
            Your Ideal Partner
          </Text>

          <View style={styles.partnerIdealWrapper}>
            <View style={styles.partnerIdealTile}>
              <Text style={styles.partnerIdealTitle}>Reduced Vacancy & Increase NOI</Text>
              <Text style={styles.partnerIdealDescription}>
                Average 3% vacancy rate with consistent monthly cash flow at above market NOI from credit-worthy tenants
              </Text>
            </View>
            <View style={styles.partnerIdealTile}>
              <Image src={assets.partnerWithUsImage1} width={480} height={326} placeholder="blur" />
            </View>
            <View style={styles.partnerIdealTile}>
              <Text style={styles.partnerIdealTitle}>Reduced Day-to-Day Responsibility</Text>
              <Text style={styles.partnerIdealDescription}>
                Ryna manages and enhances tenant relationship and engagement.
              </Text>
            </View>
            <View style={styles.partnerIdealTile}>
              <Image src={assets.partnerWithUsImage2} width={480} height={326} placeholder="blur" />
            </View>
            <View style={styles.partnerIdealTile}>
              <Image src={assets.partnerWithUsImage3} width={480} height={326} placeholder="blur" />
            </View>
            <View style={styles.partnerIdealTile}>
              <Text style={styles.partnerIdealTitle}>Quality Long-term tenants</Text>
              <Text style={styles.partnerIdealDescription}>
                We meticulously vet and background check applicants to find quality female tenants who will take care of
                your property.
              </Text>
            </View>
            <View style={styles.partnerIdealTile}>
              <Image src={assets.partnerWithUsImage4} width={480} height={326} placeholder="blur" />
            </View>
            <View style={styles.partnerIdealTile}>
              <Text style={styles.partnerIdealTitle}>Stunning Property Refinements</Text>
              <Text style={styles.partnerIdealDescription}>
                {`Ryna's design team carefully curates unique and sustainable pieces to ensure that you have a property
                you can be proud of`}
              </Text>
            </View>
          </View>
        </View>
      </ContainerDesktop>
      <View style={styles.spaces} />
      <Footer />
      <style jsx global>{`
        #__next {
          overflow-x: hidden;
        }

        h1:before,
        h1:after {
          border-top-style: dotted;
          border-top-color: ${Token.colors.rynaBlue};
          margin-top: 16px;
          content: '';
          display: inline-block;
          height: 1px;
          position: relative;
          vertical-align: middle;
          width: 40%;
          margin-left: 24px;
          margin-right: 24px;
        }
      `}</style>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 160,
    alignItems: 'center',
  },
  containerTopContent: {
    maxWidth: 980,
    marginBottom: Token.spacing.xxxxxl,
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
    fontFamily: 'futura-lt-w01-book,sans-serif',
    color: '#1C2B4F',
    fontSize: 51,
    lineHeight: 0,
    fontWeight: '700',
    textAlign: 'center',
  },
  wrapperAchivePoint: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // @ts-ignore
    gap: Token.spacing.xxl,
  },
  achivePointBullet: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointBullet: {
    width: 201,
    height: 205,
    borderWidth: 5,
    borderColor: Token.colors.rynaBlue,
    borderRadius: 205 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Token.spacing.l,
  },
  pointPercentage: {
    fontSize: Token.fontSize.huge,
    color: Token.colors.rynaBlue,
    fontFamily: 'futura-lt-w01-book,sans-serif',
  },
  pointTitle: {
    marginTop: Token.spacing.xl,
    fontSize: Token.fontSize.large,
    color: Token.colors.rynaBlue,
    fontFamily: 'futura-lt-w01-book,sans-serif',
  },
  pointDescription: {
    fontSize: Token.fontSize.medium,
    color: Token.colors.rynaBlue,
    fontFamily: 'futura-lt-w01-book,sans-serif',
    lineHeight: 24,
  },
  containerContent: {
    marginTop: Token.spacing.xxxl,
    width: '100%',
  },
  headerWithLine: {
    width: '100%',
    fontSize: Token.fontSize.huge,
    color: Token.colors.rynaBlue,
    textAlign: 'center',
    fontFamily: 'futura-lt-w01-book,sans-serif',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: Token.spacing.xxxxl,
  },
  processPartner: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  wrapperProcessTitle: {
    width: 350,
    marginLeft: Token.spacing.m,
  },
  processTitle: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '30%',
    fontSize: Token.fontSize.big,
    color: Token.colors.rynaBlue,
    fontFamily: 'futura-lt-w01-book,sans-serif',
  },
  processDescription: {
    marginTop: Token.spacing.m,
    fontSize: Token.fontSize.medium,
    color: Token.colors.rynaBlue,
    fontFamily: 'futura-lt-w01-book,sans-serif',
    lineHeight: 24,
  },
  partnerIdealWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  partnerIdealTile: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerIdealTitle: {
    maxWidth: 250,
    color: Token.colors.rynaBlue,
    fontFamily: 'lato-light,lato,sans-serif',
    letterSpacing: 1.3,
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 24,
    marginBottom: Token.spacing.l,
  },
  partnerIdealDescription: {
    maxWidth: 243,
    fontFamily: 'futura-lt-w01-light,sans-serif',
    textAlign: 'center',
    fontSize: Token.fontSize.medium,
    lineHeight: 24,
  },
  spaces: { marginVertical: Token.spacing.xxxl },
});
