import { ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useState } from 'react';

const verifiedHosts = [
  {
    id: '1',
    name: 'Elena Rodriguez',
    title: 'Sound Healing Practitioner',
    location: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1735925970492-bc215ae8d284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMzk2NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    eventsHosted: 42,
    rating: 4.9,
    specialties: ['Sound Healing', 'Cacao Ceremony']
  },
  {
    id: '2',
    name: 'Marcus Chen',
    title: 'Kundalini Yoga Master',
    location: 'Los Angeles, USA',
    image: 'https://images.unsplash.com/photo-1603203349869-02a3f4f1add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwdGVhY2hlciUyMG1hbnxlbnwxfHx8fDE3NzMzOTY0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    eventsHosted: 68,
    rating: 5.0,
    specialties: ['Kundalini', 'Breathwork']
  },
  {
    id: '3',
    name: 'Sophia Nakamura',
    title: 'Reiki Master & Energy Healer',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1650284178711-f1c13222f793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwdGVhY2hlciUyMHdvbWFufGVufDF8fHx8MTc3MzM5NjQ4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    eventsHosted: 55,
    rating: 4.8,
    specialties: ['Reiki', 'Energy Work']
  },
  {
    id: '4',
    name: 'David Okonkwo',
    title: 'Shamanic Practitioner',
    location: 'Tulum, Mexico',
    image: 'https://images.unsplash.com/photo-1662302392561-b1deecd3579d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjBoZWFsZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzMzOTY0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    eventsHosted: 37,
    rating: 4.9,
    specialties: ['Shamanic Journey', 'Temazcal']
  },
  {
    id: '5',
    name: 'Aria Thompson',
    title: 'Meditation & Mindfulness Guide',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1735925970492-bc215ae8d284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMzk2NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    eventsHosted: 91,
    rating: 5.0,
    specialties: ['Meditation', 'Mindfulness']
  },
  {
    id: '6',
    name: 'Rafael Santos',
    title: 'Breathwork Facilitator',
    location: 'Barcelona, Spain',
    image: 'https://images.unsplash.com/photo-1603203349869-02a3f4f1add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwdGVhY2hlciUyMG1hbnxlbnwxfHx8fDE3NzMzOTY0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    eventsHosted: 29,
    rating: 4.7,
    specialties: ['Breathwork', 'Healing Circle']
  }
];

export function VerifiedHostsCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardWidth = 320; // width + gap

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('hosts-scroll-container');
    if (!container) return;

    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setScrollPosition(container.scrollLeft + scrollAmount);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Hosts from our community 🪷</h2>
            <p className="text-gray-600 mt-2">A glimpse into the practitioners shaping our global community</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            id="hosts-scroll-container"
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {verifiedHosts.map((host) => (
              <div
                key={host.id}
                className="flex-shrink-0 w-[300px] bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage src={host.image} alt={host.name} />
                      <AvatarFallback>{host.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 bg-purple-600 rounded-full p-1">
                      <BadgeCheck className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-semibold text-lg text-gray-900">{host.name}</h3>
                  <p className="text-sm font-medium mt-1 text-[#6d4c89]">{host.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{host.location}</p>

                  {/* Stats */}
                  

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {host.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* View Profile Button */}
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
