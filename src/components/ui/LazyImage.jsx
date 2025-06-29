import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const LazyImage = ({ 
  src, 
  alt = '', 
  className = '', 
  fallbackSrc = '/assets/images/no_image.png',
  placeholder = null,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    setIsError(false);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoaded(false);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`} {...props}>
      {!isInView ? (
        placeholder || (
          <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
            <Icon name="Image" size={24} className="text-gray-400" />
          </div>
        )
      ) : (
        <>
          {!isLoaded && !isError && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <Icon name="Image" size={24} className="text-gray-400" />
            </div>
          )}
          <img
            src={isError ? fallbackSrc : src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;