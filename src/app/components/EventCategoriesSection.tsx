import { 
  EyeOfHorus, 
  Merkaba, 
  BasharCircuitry, 
  AmanitaMuscaria, 
  TreeOfLife, 
  FibonacciSpiral
} from './icons';

const categories = [
  {
    id: '1',
    name: 'Cacao Ceremony',
    icon: EyeOfHorus,
    image: 'https://images.unsplash.com/photo-1635099062260-33015d2a31e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWNhbyUyMGNlcmVtb255JTIwc3Bpcml0dWFsfGVufDF8fHx8MTc3MzM5NjQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Heart-opening ceremonies with sacred cacao',
    count: 124
  },
  {
    id: '2',
    name: 'Sound Healing',
    icon: Merkaba,
    image: 'https://images.unsplash.com/photo-1564513290352-53b18ee0c797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VuZCUyMGhlYWxpbmclMjB0aWJldGFuJTIwYm93bHN8ZW58MXx8fHwxNzczMzA0ODY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Healing frequencies and vibrational therapy',
    count: 298
  },
  {
    id: '3',
    name: 'Kundalini',
    icon: BasharCircuitry,
    image: 'https://images.unsplash.com/photo-1641745143988-6148c50ff668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdW5kYWxpbmklMjB5b2dhJTIwbWVkaXRhdGlvbnxlbnwxfHx8fDE3NzMzOTY0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Awaken your spiritual energy through yoga',
    count: 215
  },
  {
    id: '4',
    name: 'Breathwork',
    icon: AmanitaMuscaria,
    image: 'https://images.unsplash.com/photo-1643237131522-bbf79b062ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhdGh3b3JrJTIwaGVhbGluZyUyMHNlc3Npb258ZW58MXx8fHwxNzczMzk2NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Transformative breathing techniques',
    count: 187
  },
  {
    id: '5',
    name: 'Sacred Dance',
    icon: TreeOfLife,
    image: 'https://images.unsplash.com/photo-1635099062260-33015d2a31e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWNhbyUyMGNlcmVtb255JTIwc3Bpcml0dWFsfGVufDF8fHx8MTc3MzM5NjQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Movement as meditation and prayer',
    count: 156
  },
  {
    id: '6',
    name: 'Energy Work',
    icon: FibonacciSpiral,
    image: 'https://images.unsplash.com/photo-1641745143988-6148c50ff668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdW5kYWxpbmklMjB5b2dhJTIwbWVkaXRhdGlvbnxlbnwxfHx8fDE3NzMzOTY0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Reiki, chakra balancing, and more',
    count: 203
  }
];

export function EventCategoriesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Find your practices</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">From ancient ceremonies to modern healing, every path has a place here.</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105"
                style={{ height: '280px' }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  
                  
                  <div className="flex items-center justify-between">
                    
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}