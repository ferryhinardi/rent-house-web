import config from 'config';

// temp use imported img later will upload to digital ocean
const assets = {
  logo: require('./logo.png').default,
  logoWhite: require('./logo-white.png').default,
  loginCover: require('./login-cover.png').default,
  canadaFlag: require('./canada-flag.png'),
  GoogleLogo: require('./G__Logo.png').default,
  videoSection: require('./video-section.png').default,
  preferenceBanner: require('./preference-banner.png').default,
  // wavy line on homepage
  homeLineHorizontal: require('./line-horizontal.png'),
  homeLineHorizontal2: require('./line-2.png'),
  homeLineHorizontal3: require('./line-3.png'),
  homeLineHorizontal4: require('./line-4.png'),
  homeLineHorizontal5: require('./line-5.png'),
  // Hero Banner
  hero0: require('./hero-0.png').default,
  hero1: require('./hero-1.png').default,
  hero2: require('./hero-2.png').default,
  hero3: require('./hero-3.png').default,
  // Partner Logo
  parnerLogo: require('assets/partner-logo.png').default,
  mintoLogo: require('assets/partner-minto.png').default,
  kingsetLogo: require('assets/partner-kingset.png').default,
  bentallGreenOakLogo: require('assets/partner-bentallGreenOak.png').default,
  // Profile
  avatar: require('./avatar-sample.png').default,
  profile: require('./profile_sample.png').default,
  // Facility Icon
  rooftop: require('./ic-rooftop.png').default,
  gym: require('./ic-gym.png').default,
  pool: require('./ic-pool.png').default,
  laundry: require('./ic-laundry.png').default,
  bedroom: require('./ic-bedroom.png').default,
  bathroom: require('./ic-bathroom.png').default,
  diningroom: require('./ic-diningroom.png').default,
  // Support Media
  supportMedia1: require('assets/support-media-1.png').default,
  supportMedia2: require('assets/support-media-2.png').default,
  supportMedia3: require('assets/support-media-3.png').default,
  // placeholder
  placehoderImage: `${config.imageHost}/assets/placeholder.png`,
  // AboutUS
  splashScreenImage: require('assets/nsplsh_about_us.webp').default,
};

export default assets;
