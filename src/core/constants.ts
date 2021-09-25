import { routePaths } from 'routePaths';

export const menus = [
  { name: 'Home', href: routePaths.home },
  { name: 'Events', href: '/events' },
  { name: 'About Us', href: '/aboutus' },
  { name: 'Why Ryna', href: '/company-profile' },
  { name: 'Rental Homes', href: '/rental-homes' },
  { name: 'Partner With Us', href: '/partner-us' },
  { name: 'Blog', href: '/blog' },
];
export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'ca', label: 'Canada' },
  { value: 'id', label: 'Indonesia' },
];

export const QUERY_KEYS = {
  QUESTION_LANDING_PAGE: 'QUESTION_LANDING_PAGE',
  QUESTION_USER_PREFERENCES: 'QUESTION_LANDING_PAGE',
  CURRENT_USER: 'CURRENT_USER',
  PERKS: 'PERKS',
  EXPLORER: 'EXPLORER',
  HOUSE: 'HOUSE',
  TESTIMONY: 'TESTIMONY',
  PROCESS: 'PROCESS',
  ANSWER: 'ANSWER',
  HOUSE_DETAIL: 'HOUSE_DETAIL',
};
