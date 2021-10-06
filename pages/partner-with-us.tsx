import {
  Head,
  HeaderMenu,
  PreferenceBanner,
  Footer,
  StaticPageBanner
} from 'components';
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
        <StaticPageBanner title={t('partnerUs')} />
        <ContainerDesktop style={styles.container}>
            <Text ink="dark" font="playfair" variant="header-3">
                Achieve Higher Return With Us
            </Text>
            <br /><br />
            
            <Text ink="dark" variant="large">
                30%+ Higher NOI
                <br /><br />
                <Text ink="dark">
                    Ryna provides operational services like cleaning, and on-call tenant support to unlock additional NOI.
                </Text>
                <br /><br />
                290+ bps CAP Rate
                <br /><br />
                <Text ink="dark">
                    Our strategy identifies value-add opportunities by capitalizing on under-utilized space to increase the cap rate upon purchase.
                </Text>
                <br /><br />
                97% Occupancy
                <br /><br />
                <Text ink="dark">
                    Enjoy fast lease up and low vacancy due to hands-on leasing and daily engagement with members.
                </Text>
                <br /><br />
            </Text>

            <br /><br />
            <Text ink="dark" font="playfair" variant="header-3">
                How we partner
            </Text>
            <br /><br />
            
            <Text ink="dark" variant="large">
                Send us project information
                <br /><br />
                <Text ink="dark">
                    Floor plans, building massing, financial models, offering memorandums, etc
                </Text>
                <br /><br />
                Ryna's evaluation
                <br /><br />
                <Text ink="dark">
                    Ryna will provide a detailed pro-forma and property analysis
                </Text>
                <br /><br />
                Sign agreement & lease up
                <br /><br />
                <Text ink="dark">
                    Ryna will also provide on-going tenant relationship management.
                </Text>
                <br /><br />
            </Text>

            <br /><br />
            <Text ink="dark" font="playfair" variant="header-3">
                Your Ideal Partner
            </Text>
            <br /><br />
            
            <Text ink="dark" variant="large">
                Reduced Vacancy & Increase NOI
                <br /><br />
                <Text ink="dark">
                    Average 3% vacancy rate with consistent monthly cash flow at above market NOI from credit-worthy tenants
                </Text>
                <br /><br />
                Quality Long-term tenants
                <br /><br />
                <Text ink="dark">
                    We meticulously vet and background check applicants to find quality female tenants who will take care of your property. 
                </Text>
                <br /><br />
                Reduced Day-to-Day Responsibility
                <br /><br />
                <Text ink="dark">
                    Ryna manages and enhances tenant relationship and engagement.
                </Text>
                <br /><br />
                Stunning Property Refinements
                <br /><br />
                <Text ink="dark">
                    Ryna's design team carefully curates unique and sustainable pieces to ensure that you have a property you can be proud of
                </Text>
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
    active: {
      fontWeight: '600',
    },
  });
