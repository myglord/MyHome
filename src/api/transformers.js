import React from 'react';

const DEFAULT_THUMB = '/assets/images/thumbs/property-1.png';

export function apiPropertyToFrontend(p) {
  return {
    id: p.id,
    thumb: p.image_url || DEFAULT_THUMB,
    price: typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : `$${p.price || '0'}`,
    day: '/per day',
    title: p.title || '',
    desc: p.description || '',
    locationIcon: <i className="fas fa-map-marker-alt"></i>,
    location: p.location || '',
    amenities: [
      { icon: <i className="fas fa-bed"></i>, text: `${p.bedrooms ?? 0} Beds` },
      { icon: <i className="fas fa-bath"></i>, text: `${p.bathrooms ?? 0} Baths` },
    ],
    btnText: 'Book Now',
    dataSort: 'Newest',
    dataStatuses: p.status || 'active',
    dataTypes: p.type || 'Buy',
    dataLocations: p.location || '',
  };
}
