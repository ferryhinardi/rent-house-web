import React from 'react';
import Image from 'next/image';
import assets from 'assets';

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
      srcImg = assets.rooftop;
      break;
    case 'gym':
      srcImg = assets.gym;
      break;
    case 'pool':
      srcImg = assets.pool;
      break;
    case 'laundry':
      srcImg = assets.laundry;
      break;
    case 'bedroom':
      srcImg = assets.bedroom;
      break;
    case 'bathroom':
      srcImg = assets.bathroom;
      break;
    case 'diningroom':
      srcImg = assets.diningroom;
      break;
    default:
      return null;
      break;
  }

  return srcImg ? (
    <Image {...srcImg} alt={`${name}-icon`} layout="fixed" />
  ) : null;
}
