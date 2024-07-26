import React from 'react';
import LazyLoad from 'react-lazyload';

interface LazyImageProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  offset?: number;
  placeholderSrc?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  height = 200,
  width = 200,
  offset = 100,
  placeholderSrc,
}) => (
  <LazyLoad height={height} offset={offset} placeholder={placeholderSrc ? <img src={placeholderSrc} alt="Loading..." /> : null}>
    <img src={src} alt={alt} height={height} width={width} />
  </LazyLoad>
);

export default LazyImage;
