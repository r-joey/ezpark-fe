import { useEffect, useRef, useState } from 'react';

export default function LeafletMap({ locations, onReserve }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRefs = useRef({});
  const lastPopupContent = useRef({});
  const [mapReady, setMapReady] = useState(false);
 
  useEffect(() => {
    const leafletCss = document.createElement('link');
    leafletCss.rel = 'stylesheet';
    leafletCss.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(leafletCss);

    const leafletScript = document.createElement('script');
    leafletScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    leafletScript.async = true;
    leafletScript.onload = () => {
      if (window.L && mapRef.current) {
        mapInstance.current = window.L.map(mapRef.current).setView([7.0700, 125.6100], 13);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapInstance.current);
        setMapReady(true);
      }
    };
    document.body.appendChild(leafletScript);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
      document.head.removeChild(leafletCss);
      document.body.removeChild(leafletScript);
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !mapInstance.current || !window.L) return;

    const newMarkerRefs = {};

    locations.forEach((location) => {
      const availableSlots = location.slots.filter(slot => slot.is_available).length;

      const popupContent = `
        <div class="space-y-2 min-w-[180px]">
          <h2 class="text-lg font-semibold text-gray-800">${location.name}</h2>
          <p class="text-2xl text-center text-gray-700">
            <span class="font-extrabold text-3xl">${availableSlots}</span> slots left
          </p>
          <button id="reserve-btn-${location.id}" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md">
            Reserve
          </button>
        </div>
      `;

      const existingMarker = markerRefs.current[location.id];

      if (existingMarker) {
        const lastContent = lastPopupContent.current[location.id];
      if (lastContent !== popupContent) {
          existingMarker.setPopupContent(popupContent);
          existingMarker.openPopup();  
          lastPopupContent.current[location.id] = popupContent;
 
          setTimeout(() => {
            const btn = document.getElementById(`reserve-btn-${location.id}`);
            if (btn) {
              btn.onclick = () => onReserve(location);
            }
          }, 0);
        } 
        newMarkerRefs[location.id] = existingMarker;
      } else {
        const marker = window.L.marker([location.latitude, location.longitude]).addTo(mapInstance.current);
        marker.bindPopup(popupContent, { minWidth: 200 });
 
        marker.on('popupopen', () => {
          const btn = document.getElementById(`reserve-btn-${location.id}`);
          if (btn) {
            btn.onclick = () => onReserve(location);
          }
        });

        newMarkerRefs[location.id] = marker;
        lastPopupContent.current[location.id] = popupContent;
      }
    });

    Object.keys(markerRefs.current).forEach(id => {
      if (!newMarkerRefs[id]) {
        mapInstance.current.removeLayer(markerRefs.current[id]);
        delete lastPopupContent.current[id];
      }
    });

    markerRefs.current = newMarkerRefs;
  }, [locations, mapReady]);

  return (
    <div
      ref={mapRef}
      className="z-10 w-full h-200 rounded-lg shadow-lg overflow-hidden border border-gray-200"
    />
  );
}
