import { View } from 'react-native';
import { Head, HeaderMenu, BannerWelcome, AccountRecommendation, VideoSection, Perks, Footer } from 'components';
import useTailwind from 'hooks/useTailwind';

export default function RegisterSuccessfully() {
  const { tailwind } = useTailwind();

  return (
    <View style={tailwind('h-full')}>
      <Head />
      <HeaderMenu />
      <BannerWelcome />
      <View style={tailwind('p-14')}>
        <AccountRecommendation />
      </View>
      <VideoSection />
      <Perks />
      <Footer />
    </View>
  );
}
