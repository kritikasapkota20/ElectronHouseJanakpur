import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const ProductZoom = ({ images, selectedImage, onImageSelect }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setMousePosition({ x, y });
    setZoomPosition({
      x: -x * 2 + 50,
      y: -y * 2 + 50
    });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className="relative">
      {/* Main Image with Zoom */}
      <div
        ref={containerRef}
        className="relative aspect-square rounded-lg overflow-hidden bg-white cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={images[selectedImage]}
          alt="Product"
          fill
          className="object-contain"
          unoptimized
        />
        {isZoomed && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${images[selectedImage]})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: '200%',
              backgroundRepeat: 'no-repeat',
              transform: 'scale(1.5)',
              transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
            }}
          />
        )}
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`relative aspect-square rounded-lg overflow-hidden ${
              selectedImage === index ? 'ring-2 ring-primary' : ''
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-contain"
              unoptimized
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductZoom; 