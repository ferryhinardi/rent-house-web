const config = {
  apiHost: process.env.NEXT_PUBLIC_API_HOST,
  appHost: process.env.NEXT_PUBLIC_APP_HOST,
  googleAPIKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || 'AIzaSyAzmQVVWpZ2iMdVO9_5awTVAECu8vz6pi0',
  googleAuthKey: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
  imageHost: process.env.NEXT_PUBLIC_IMAGE_HOST,
  fbAppId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
  comingSoonImage: process.env.NEXT_DEFAULT_COMING_SOON_PLACEHOLDER || 'staging/media/image/coming-soon.jpg',
};

export default config;
