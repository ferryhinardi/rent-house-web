import { routePaths } from 'routePaths';
import assets from 'assets';

export const menus = [
  { name: 'Homes', href: routePaths.home },
  { name: 'Events', href: '/events' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Rental Homes', href: '/rental-homes' },
  { name: 'Partner With Us', href: '/partner-with-us' },
  { name: 'Blog', href: '/blog' },
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

export const proofIncomeOptions = [
  { value: 0, label: 'Paystub' },
  { value: 1, label: 'Guarantor' },
];

export const QUERY_KEYS = {
  QUESTION_LANDING_PAGE: 'QUESTION_LANDING_PAGE',
  QUESTION_USER_PREFERENCES: 'QUESTION_LANDING_PAGE',
  CURRENT_USER: 'CURRENT_USER',
  EMERGENCY_CONTACT: 'EMERGENCY_CONTACT',
  PERKS: 'PERKS',
  EXPLORER: 'EXPLORER',
  HOUSE: 'HOUSE',
  HOUSE_MATCH: 'HOUSE_MATCH',
  TESTIMONY: 'TESTIMONY',
  PROCESS: 'PROCESS',
  ANSWER: 'ANSWER',
  HOUSE_DETAIL: 'HOUSE_DETAIL',
  HOME_DETAIL: 'HOME_DETAIL',
  HOME_ROOM: 'HOME_ROOM',
  APPLICATION_DETAIL: 'APPLICATION_DETAIL',
  USER_APPLICATIONS: 'USER_APPLICATIONS',
  ROOMMATES: 'ROOMMATES',
  USER: 'USER',
  DOCUMENT: 'DOCUMENT',
};

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
