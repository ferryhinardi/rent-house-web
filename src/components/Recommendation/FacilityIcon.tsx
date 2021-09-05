import React from 'react';
import Image from 'next/image';

type Props = {
  name:
    | 'rooftop'
    | 'gym'
    | 'pool'
    | 'laundry'
    | 'bedroom'
    | 'bathroom'
    | 'diningroom';
};

export default function FacilityIcon({ name }: Props) {
  let srcImg;
  switch (name) {
    case 'rooftop':
      srcImg = require('assets/ic-rooftop.svg');
      break;
    case 'gym':
      srcImg = require('assets/ic-gym.svg');
      break;
    case 'pool':
      srcImg = require('assets/ic-pool.svg');
      break;
    case 'laundry':
      srcImg = require('assets/ic-laundry.svg');
      break;
    case 'bedroom':
      srcImg = require('assets/ic-bedroom.svg');
      break;
    case 'bathroom':
      srcImg = require('assets/ic-bathroom.svg');
      break;
    case 'diningroom':
      srcImg = require('assets/ic-diningroom.svg');
      break;
    default:
      return null;
      break;
  }

  return srcImg ? (
    <Image src={srcImg} alt={`${name}-icon`} layout="fixed" />
  ) : null;
}
