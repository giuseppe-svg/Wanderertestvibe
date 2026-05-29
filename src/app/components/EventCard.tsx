import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  city?: string;
  venue?: string;
  spotsLeft?: number;
  organizer: string;
  attendees: number;
  price: string;
  category: string;
  image: string;
  requiresApproval?: boolean;
  isFavorited?: boolean;
  onEventClick?: (id: string) => void;
}

export function EventCard({
  id,
  title,
  description,
  date,
  time,
  city,
  venue,
  spotsLeft,
  price,
  category,
  image,
  requiresApproval = false,
  onEventClick,
}: EventCardProps) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col"
      onClick={() => onEventClick?.(id)}
    >
      {/* Image */}
      <div className="relative h-44 shrink-0">
        <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <Badge variant="secondary" className="w-fit text-xs font-medium bg-gray-100 text-gray-700 rounded-md px-2 py-0.5">
          {category}
        </Badge>

        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">{title}</h3>

        {venue && <p className="text-xs text-gray-500">Venue: {venue}</p>}

        <p className="text-xs text-gray-500 line-clamp-2">{description}</p>

        <div className="flex flex-col gap-1 mt-auto pt-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{date}, {time}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>Exact address shared after confirmation</span>
          </div>
          {city && <p className="text-xs text-gray-400 pl-5">{city}</p>}
          {spotsLeft !== undefined && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Users className="h-3.5 w-3.5 shrink-0" />
              <span>{spotsLeft} spots left</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-1">
          <span className="font-semibold text-base text-gray-900">{price}</span>
          <Button
            size="sm"
            className="bg-gray-900 hover:bg-gray-800 text-white text-xs px-4 py-1.5 h-auto rounded-lg"
            onClick={(e) => { e.stopPropagation(); onEventClick?.(id); }}
          >
            {requiresApproval ? 'Require' : 'Join Event'}
          </Button>
        </div>
      </div>
    </div>
  );
}