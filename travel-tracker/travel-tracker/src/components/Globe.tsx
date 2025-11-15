import { useEffect, useRef, useState } from 'react';
import GlobeGL from 'react-globe.gl';
import * as THREE from 'three';
import type { FlightPath, Location } from '../types';

interface GlobeProps {
  flightPaths: FlightPath[];
  userLocation: Location | null;
  destination: Location | null;
  onGlobeReady?: () => void;
}

export const Globe = ({ flightPaths, userLocation, destination, onGlobeReady }: GlobeProps) => {
  const globeEl = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;

      // Point of view
      if (userLocation) {
        globeEl.current.pointOfView({
          lat: userLocation.lat,
          lng: userLocation.lng,
          altitude: 2.5
        }, 1000);
      }

      setGlobeReady(true);
      if (onGlobeReady) {
        onGlobeReady();
      }
    }
  }, [userLocation, onGlobeReady]);

  useEffect(() => {
    if (globeReady && destination && globeEl.current) {
      // Animate to show the flight path
      globeEl.current.pointOfView({
        lat: (userLocation!.lat + destination.lat) / 2,
        lng: (userLocation!.lng + destination.lng) / 2,
        altitude: 2.5
      }, 2000);
    }
  }, [destination, globeReady, userLocation]);

  // Animation loop for the plane
  useEffect(() => {
    if (flightPaths.length === 0) return;

    const animationSpeed = 0.002; // Adjust speed here
    let animationId: number;

    const animate = () => {
      setAnimationProgress(prev => {
        const next = prev + animationSpeed;
        return next > 1 ? 0 : next; // Loop the animation
      });
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [flightPaths]);

  // Convert flight paths to arcs data
  const arcsData = flightPaths.map(path => ({
    startLat: path.from.lat,
    startLng: path.from.lng,
    endLat: path.to.lat,
    endLng: path.to.lng,
    color: path.color || '#ff6b6b',
  }));

  // Create points for origin and destination
  const pointsData = [];
  if (userLocation) {
    pointsData.push({
      lat: userLocation.lat,
      lng: userLocation.lng,
      size: 0.5,
      color: '#4CAF50',
      label: userLocation.name
    });
  }
  if (destination) {
    pointsData.push({
      lat: destination.lat,
      lng: destination.lng,
      size: 0.5,
      color: '#ff6b6b',
      label: destination.name
    });
  }

  // Helper function to interpolate position along the arc
  const interpolateArc = (startLat: number, startLng: number, endLat: number, endLng: number, progress: number) => {
    // Convert to radians
    const lat1 = (startLat * Math.PI) / 180;
    const lng1 = (startLng * Math.PI) / 180;
    const lat2 = (endLat * Math.PI) / 180;
    const lng2 = (endLng * Math.PI) / 180;

    // Interpolate along great circle
    const d = 2 * Math.asin(Math.sqrt(
      Math.pow(Math.sin((lat1 - lat2) / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lng1 - lng2) / 2), 2)
    ));

    const a = Math.sin((1 - progress) * d) / Math.sin(d);
    const b = Math.sin(progress * d) / Math.sin(d);

    const x = a * Math.cos(lat1) * Math.cos(lng1) + b * Math.cos(lat2) * Math.cos(lng2);
    const y = a * Math.cos(lat1) * Math.sin(lng1) + b * Math.cos(lat2) * Math.sin(lng2);
    const z = a * Math.sin(lat1) + b * Math.sin(lat2);

    const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
    const lng = Math.atan2(y, x);

    // Add altitude (arc height)
    const altitude = Math.sin(progress * Math.PI) * 0.3;

    return {
      lat: (lat * 180) / Math.PI,
      lng: (lng * 180) / Math.PI,
      altitude
    };
  };

  // Create plane objects for each flight path
  const planeObjects = flightPaths.map((path, index) => {
    const position = interpolateArc(
      path.from.lat,
      path.from.lng,
      path.to.lat,
      path.to.lng,
      animationProgress
    );

    return {
      lat: position.lat,
      lng: position.lng,
      altitude: position.altitude,
      pathIndex: index
    };
  });

  return (
    <GlobeGL
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

      // Arcs (flight paths)
      arcsData={arcsData}
      arcColor="color"
      arcDashLength={0.4}
      arcDashGap={0.2}
      arcDashAnimateTime={1500}
      arcStroke={0.5}

      // Points (locations)
      pointsData={pointsData}
      pointAltitude={0.01}
      pointRadius="size"
      pointColor="color"
      pointLabel="label"

      // Custom objects (planes)
      objectsData={planeObjects}
      objectLat="lat"
      objectLng="lng"
      objectAltitude="altitude"
      objectThreeObject={() => {
        // Create a simple plane geometry (much larger and more visible)
        const planeGroup = new THREE.Group();

        // Main body (fuselage)
        const bodyGeometry = new THREE.CylinderGeometry(0.8, 0.8, 4, 8);
        const bodyMaterial = new THREE.MeshLambertMaterial({
          color: '#ffffff',
          emissive: '#4fc3f7',
          emissiveIntensity: 0.3
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.rotation.z = Math.PI / 2;
        planeGroup.add(body);

        // Nose cone
        const noseGeometry = new THREE.ConeGeometry(0.8, 1.5, 8);
        const nose = new THREE.Mesh(noseGeometry, bodyMaterial);
        nose.rotation.z = -Math.PI / 2;
        nose.position.x = 2.75;
        planeGroup.add(nose);

        // Wings
        const wingGeometry = new THREE.BoxGeometry(0.3, 8, 1.5);
        const wingMaterial = new THREE.MeshLambertMaterial({
          color: '#e0e0e0',
          emissive: '#4fc3f7',
          emissiveIntensity: 0.2
        });
        const wings = new THREE.Mesh(wingGeometry, wingMaterial);
        planeGroup.add(wings);

        // Tail fin
        const tailGeometry = new THREE.BoxGeometry(0.3, 1.5, 2);
        const tail = new THREE.Mesh(tailGeometry, wingMaterial);
        tail.position.x = -2;
        tail.position.z = 0.5;
        planeGroup.add(tail);

        return planeGroup;
      }}

      // Atmosphere
      atmosphereColor="#4fc3f7"
      atmosphereAltitude={0.15}

      // Animation
      animateIn={true}
    />
  );
};
