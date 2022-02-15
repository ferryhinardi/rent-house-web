import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { ImageLoader } from 'core/utils/imageHelper';

import assets from 'assets';

type ImageWithFallbackProps = {
  fallback?: string;
} & ImageProps;

const ImageWithFallback = ({ fallback = assets.placehoderImage, ...props }: ImageWithFallbackProps) => {
  const [src, setSrc] = useState<ImageProps['src']>(props.src);

  const onError = () => {
    setSrc(fallback);
  };

  return <Image {...props} src={src} loader={ImageLoader} onError={onError} />;
};

export default ImageWithFallback;
