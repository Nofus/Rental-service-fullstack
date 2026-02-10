import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { OffersList } from '../../types/offer';

const defaultCustomIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

const currentCustomIcon = L.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

const activeCustomIcon = L.icon({
  iconUrl: '/img/map-icon-active.jpg',
  iconSize: [40, 39],
  iconAnchor: [20, 39],
});

type MapProps = {
  offers: OffersList[];
  selectedOfferId?: string;
  activeOfferId?: string;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  className?: string;
}

function Map({ offers, selectedOfferId, activeOfferId, city, className = 'cities__map' }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [city]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    offers.forEach((offer) => {
      let icon;
      if (offer.id === activeOfferId) {
        icon = activeCustomIcon;
      } else if (offer.id === selectedOfferId) {
        icon = currentCustomIcon;
      } else {
        icon = defaultCustomIcon;
      }

      const marker = L.marker([offer.location.latitude, offer.location.longitude], {
        icon,
      }).addTo(mapInstanceRef.current!);

      markersRef.current.push(marker);
    });

    if (offers.length > 0) {
      const bounds = L.latLngBounds(offers.map(offer => [offer.location.latitude, offer.location.longitude]));
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [offers, selectedOfferId, activeOfferId]);

  return <div ref={mapRef} className={`map ${className}`} />;
}

export { Map };