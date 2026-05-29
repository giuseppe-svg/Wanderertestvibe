import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";

interface JoinWandererCTAProps {
  onJoinCommunity: () => void;
}

const benefits = [
  {
    title: 'Reach a global spiritual audience',
    desc: 'Your events are discoverable by seekers browsing by category, location, and language.',
  },
  {
    title: 'Manage everything from one flow',
    desc: 'Handle participants, approvals, and event updates without jumping across tools.',
  },
  {
    title: 'Grow long-term trust',
    desc: 'Transparent event pages and profile context support repeat attendance and stronger retention.',
  },
];

export function JoinWandererCTA({ onJoinCommunity }: JoinWandererCTAProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left */}
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-4">
                FOR HOSTS
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                Share your practice with the right people
              </h2>
              <p className="text-gray-500 text-base mb-8 max-w-md">
                From intimate circles to larger gatherings, Wanderer helps you publish
                clear listings and welcome aligned attendees.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={onJoinCommunity}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 font-semibold"
                >
                  Start hosting
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-800 hover:bg-gray-50 px-6 py-2.5 font-medium"
                >
                  Read our mission
                </Button>
              </div>
            </div>

            {/* Right */}
            <div className="bg-gray-50 p-10 lg:p-14 flex flex-col justify-center gap-6 border-l border-gray-200">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{b.title}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
