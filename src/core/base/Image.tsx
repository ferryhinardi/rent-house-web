import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

import assets from 'assets';

type ImageWithFallbackProps = {
  fallback?: string;
} & ImageProps;

const ImageWithFallback = ({ fallback = assets.placehoderImage, ...props }: ImageWithFallbackProps) => {
  const [src, setSrc] = useState<any>(props.src);

  const onError = () => {
    setSrc(fallback);
  };

  return <Image {...props} src={src} onError={onError} />;
};

export default ImageWithFallback;
