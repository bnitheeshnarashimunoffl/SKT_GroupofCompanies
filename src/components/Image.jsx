import { useEffect, useState, useRef } from 'react';

/**
 * Image Component with lazy loading and aspect-ratio containers
 * 
 * Per 02-styling-and-layout.md:
 * - Prevents layout shift with aspect-ratio containers
 * - Lazy loading for offscreen images
 * - Object-fit: cover for consistent cropping
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} aspectRatio - One of: '16-9', '4-3', '1-1', '3-4', '2-3'
 * @param {boolean} lazy - Enable lazy loading (default: true)
 * @param {boolean} zoom - Enable hover zoom effect (default: false)
 * @param {string} className - Additional CSS classes
 */
export default function Image({
  src,
  alt,
  aspectRatio = '4-3',
  lazy = true,
  zoom = false,
  className = ''
}) {
  const [loaded, setLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(!lazy);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [lazy]);

  // Handle image load
  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div
      ref={imgRef}
      className={`img-wrapper aspect-${aspectRatio} ${lazy ? 'lazy' : ''} ${zoom ? 'img-zoom' : ''} ${className}`}
    >
      {isVisible && (
        <img
          src={src}
          alt={alt}
          className={loaded ? 'loaded' : ''}
          onLoad={handleLoad}
          loading={lazy ? 'lazy' : 'eager'}
        />
      )}
    </div>
  );
}
