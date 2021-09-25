import { routePaths } from 'routePaths';
import assets from 'assets';

export const menus = [
  { name: 'Company', href: routePaths.home },
  { name: 'About Us', href: '/aboutus' },
  { name: 'Events', href: '/events' },
  { name: 'Blog', href: '/blog' },
  { name: 'Find My Home', href: '/rental-homes' },
  { name: 'Career', href: '/partner-us' },
];

export const languageOptions = [
  { value: 'en', label: 'English', icon: assets.canadaFlag },
  { value: 'ca', label: 'Canada', icon: assets.canadaFlag },
  { value: 'id', label: 'Indonesia', icon: assets.canadaFlag },
];

export const genderOptions = [
  { value: 0, label: 'Male' },
  { value: 1, label: 'Female' },
  { value: 2, label: 'Others' },
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
  HOME_DETAIL: 'HOME_DETAIL',
  HOME_ROOM: 'HOME_ROOM',
};
