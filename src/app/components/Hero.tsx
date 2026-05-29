import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { MapPin, Calendar } from 'lucide-react';

interface HeroProps {
  onDiscoverEvents?: () => void;
  onHostEvent?: () => void;
}

// Simple interactive globe using canvas
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = Math.min(W, H) * 0.42;

    // Simplified world land outlines as lat/lng points (major continents)
    const landPolygons = [
      // Europe
      [[35,28],[37,23],[40,20],[44,16],[48,16],[52,18],[56,20],[60,22],[64,24],[66,28],[68,32],[65,38],[60,42],[55,45],[50,46],[44,44],[40,40],[38,36],[36,32],[35,28]],
      // Africa
      [[35,28],[37,34],[38,40],[40,48],[38,52],[34,54],[28,54],[22,50],[18,44],[14,40],[10,36],[10,28],[14,22],[18,18],[24,14],[30,12],[36,16],[38,20],[36,26],[35,28]],
      // Asia (simplified)
      [[68,32],[70,36],[72,40],[75,45],[78,50],[80,55],[78,60],[74,64],[70,68],[65,70],[60,68],[55,64],[50,60],[48,56],[45,52],[44,48],[46,44],[50,42],[55,38],[60,36],[64,34],[68,32]],
      // North America
      [[-70,42],[-68,46],[-66,50],[-62,52],[-58,56],[-60,60],[-64,64],[-68,68],[-72,70],[-76,70],[-80,68],[-84,64],[-86,60],[-88,56],[-90,52],[-92,48],[-94,44],[-96,40],[-98,36],[-100,32],[-96,28],[-92,24],[-88,20],[-84,18],[-80,18],[-76,20],[-72,24],[-70,28],[-70,32],[-70,38],[-70,42]],
      // South America
      [[-70,4],[-68,0],[-66,-4],[-64,-8],[-60,-12],[-58,-16],[-56,-20],[-54,-24],[-52,-28],[-50,-32],[-52,-36],[-56,-40],[-60,-44],[-62,-48],[-64,-52],[-66,-54],[-62,-52],[-58,-48],[-54,-44],[-50,-40],[-48,-36],[-46,-32],[-44,-28],[-42,-22],[-40,-16],[-40,-10],[-42,-4],[-46,0],[-50,4],[-54,6],[-58,8],[-62,6],[-66,4],[-70,4]],
      // Australia
      [[114,-22],[116,-18],[120,-16],[124,-14],[128,-14],[132,-16],[136,-18],[138,-22],[140,-26],[140,-30],[138,-34],[134,-36],[130,-36],[126,-34],[122,-30],[118,-26],[114,-22]],
    ];

    // Event dots (lat, lng, color)
    const eventDots: [number, number, string][] = [
      [41.9, 12.5, '#7C3AED'],   // Rome
      [43.8, 11.2, '#7C3AED'],   // Florence
      [45.5, 9.2, '#7C3AED'],    // Milan
      [48.9, 2.3, '#9333EA'],    // Paris
      [51.5, -0.1, '#7C3AED'],   // London
      [40.7, -74, '#9333EA'],    // New York
      [34.1, -118.2, '#7C3AED'], // LA
      [-6.2, 106.8, '#9333EA'],  // Jakarta
      [35.7, 139.7, '#7C3AED'], // Tokyo
      [-33.9, 151.2, '#9333EA'], // Sydney
      [19.4, -99.1, '#7C3AED'], // Mexico City
      [-23.5, -46.6, '#9333EA'], // São Paulo
      [28.6, 77.2, '#7C3AED'],  // Delhi
      [55.8, 37.6, '#9333EA'],  // Moscow
      [-4.3, 15.3, '#7C3AED'],  // Kinshasa
    ];

    const toRad = (d: number) => (d * Math.PI) / 180;

    function project(lat: number, lng: number, rotation: number): [number, number, boolean] {
      const phi = toRad(lat);
      const lambda = toRad(lng) + rotation;
      const x = Math.cos(phi) * Math.cos(lambda);
      const y = Math.sin(phi);
      const z = Math.cos(phi) * Math.sin(lambda);
      const visible = z > -0.1;
      const px = cx + R * x;
      const py = cy - R * y;
      return [px, py, visible];
    }

    let animId: number;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Globe sphere gradient
      const grad = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.2, R * 0.05, cx, cy, R);
      grad.addColorStop(0, '#f5f0ff');
      grad.addColorStop(0.6, '#ede9fe');
      grad.addColorStop(1, '#ddd6fe');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Graticules (latitude/longitude grid)
      ctx.strokeStyle = 'rgba(139,92,246,0.12)';
      ctx.lineWidth = 0.5;
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 3) {
          const [px, py, vis] = project(lat, lng, rotationRef.current);
          if (!vis) { first = true; continue; }
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          first = false;
        }
        ctx.stroke();
      }
      for (let lng = -180; lng < 180; lng += 20) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 3) {
          const [px, py, vis] = project(lat, lng, rotationRef.current);
          if (!vis) { first = true; continue; }
          first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
          first = false;
        }
        ctx.stroke();
      }

      // Land polygons
      for (const poly of landPolygons) {
        ctx.beginPath();
        let started = false;
        for (const [lat, lng] of poly) {
          const [px, py, vis] = project(lat, lng, rotationRef.current);
          if (!vis) { started = false; continue; }
          started ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
          started = true;
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(139,92,246,0.18)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(124,58,237,0.3)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Event dots
      for (const [lat, lng, color] of eventDots) {
        const [px, py, vis] = project(lat, lng, rotationRef.current);
        if (!vis) continue;
        // Glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 8);
        glow.addColorStop(0, color + 'aa');
        glow.addColorStop(1, color + '00');
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        // Dot
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // Globe rim shadow
      const rim = ctx.createRadialGradient(cx, cy, R * 0.75, cx, cy, R);
      rim.addColorStop(0, 'transparent');
      rim.addColorStop(1, 'rgba(109,40,217,0.15)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = rim;
      ctx.fill();

      if (!isDragging.current) {
        rotationRef.current += 0.004;
      }
      animId = requestAnimationFrame(draw);
    }

    draw();

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastX.current = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      rotationRef.current += (e.clientX - lastX.current) * 0.01;
      lastX.current = e.clientX;
    };
    const onMouseUp = () => { isDragging.current = false; };
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={520}
      height={520}
      className="cursor-grab active:cursor-grabbing select-none"
      style={{ maxWidth: '100%' }}
    />
  );
}

export function Hero({ onDiscoverEvents, onHostEvent }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find and Host
                <span className="block text-purple-600">Spiritual Events</span>
                Anywhere
              </h1>
              <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
                The global platform connecting seekers with authentic spiritual events,
                communities, and transformative experiences in every city worldwide.
              </p>
            </div>

            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-600">57 Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-600">114 Events</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-7 py-3 text-base font-semibold"
                onClick={onHostEvent}
              >
                Host an Event✨
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-800 hover:bg-gray-50 px-7 py-3 text-base font-medium"
                onClick={onDiscoverEvents}
              >
                Explore Events Near You
              </Button>
            </div>
          </div>

          {/* Right – Globe */}
          <div className="relative flex items-center justify-center">
            <GlobeCanvas />

            {/* Floating card – Live Events */}
            <div className="absolute top-6 right-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-100">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-500 font-medium">Live Events</span>
              </div>
              <span className="text-3xl font-bold text-gray-900">30</span>
            </div>

            {/* Drag hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400 select-none">
              Drag to rotate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
