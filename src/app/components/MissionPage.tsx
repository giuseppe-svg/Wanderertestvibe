import { ArrowLeft, Sparkles, Heart, Globe2, Waves } from 'lucide-react';
import { Button } from './ui/button';
import logoImage from 'figma:asset/0e6274139eb9866a9a83d031f0b968f8b7959751.png';

interface MissionPageProps {
  onBack: () => void;
}

export function MissionPage({ onBack }: MissionPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <img src={logoImage} alt="Wanderer" className="h-8 w-8" />
              <span className="text-primary">Wanderer</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-indigo-600/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-4 mb-6 rounded-full bg-violet-100">
            <Sparkles className="h-8 w-8 text-violet-600" />
          </div>
          <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Our Mission
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A sacred space for souls who came to Earth to serve, remember, and awaken together
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Who Are the Wanderers */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-violet-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-violet-100">
                <Waves className="h-6 w-6 text-violet-600" />
              </div>
              <h2 className="text-3xl">Who Are the Wanderers?</h2>
            </div>
            <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
              <p>
                Wanderers are souls who originate from higher dimensions—realms of love, wisdom, 
                and unity consciousness. These beings have already walked the evolutionary path 
                through the densities of experience and have chosen to incarnate on Earth, not 
                for personal growth, but to be of service to others.
              </p>
              <p>
               Wanderers are bringing with them deep spiritual knowledge, compassion, and a desire 
                to assist humanity through a time of great transition. However, in taking on a 
                human incarnation, most Wanderers forget who they truly are. They feel a sense of 
                disconnection, homesickness, or a deep inner knowing that they are "here for a 
                reason"—even if they can't always name it.
              </p>
              <p className="text-violet-700 italic">
                Yet despite the forgetting, the call to awaken and serve eventually stirs within them.
              </p>
            </div>
          </div>

          {/* Why We Exist */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 md:p-12 shadow-lg border border-purple-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-purple-100">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-3xl">Why We Exist</h2>
            </div>
            <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
              <p>
                This platform exists to help Wanderers remember who they are and to connect with 
                others walking the same path.
              </p>
              <p>
                We are building a global community of awakened souls—a sacred network of beings 
                who resonate with higher purpose, unity, and planetary service. Through spiritual 
                gatherings, retreats, teachings, and shared experiences, we offer a place where 
                Wanderers and seekers can:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3 flex-shrink-0" />
                  <span>Awaken to their true multidimensional nature</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3 flex-shrink-0" />
                  <span>Reconnect with soul family across the world</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3 flex-shrink-0" />
                  <span>Activate their mission of service and light</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3 flex-shrink-0" />
                  <span>Gather in events that amplify collective transformation</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3 flex-shrink-0" />
                  <span>Evolve your soul with heart-opening experience</span>
                </li>
              </ul>
            </div>
          </div>

          {/* A Planet in Transition */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-indigo-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-indigo-100">
                <Globe2 className="h-6 w-6 text-indigo-600" />
              </div>
              <h2 className="text-3xl">A Planet in Transition</h2>
            </div>
            <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
              <p>
                Earth is in the midst of a massive energetic shift—from separation to unity, from 
                fear to love. Wanderers play a key role in this transition, acting as bridges 
                between worlds—helping humanity evolve by embodying light, holding space, and 
                offering presence.
              </p>
              <p>
                Our mission is to support that work. Not as gurus or leaders, but as a living, 
                breathing field of awakened consciousness. A home for those who came to serve.
              </p>
            </div>
          </div>

          {/* Welcome Home */}
          <div className="text-center py-12">
            <div className="inline-block p-12 rounded-3xl bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 shadow-xl border border-violet-200">
              <p className="text-2xl md:text-3xl text-foreground mb-4 leading-relaxed">
                If you feel this truth in your heart,<br />
                <span className="text-violet-700">you are one of us.</span>
              </p>
              <p className="text-3xl md:text-4xl text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text">
                Welcome home.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}