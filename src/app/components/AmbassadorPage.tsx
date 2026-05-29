import { ArrowLeft, Sparkles, Globe, Heart, Users, DollarSign, Gift, Network, Check, Star } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Card } from './ui/card';

interface AmbassadorPageProps {
  onBack: () => void;
}

export function AmbassadorPage({ onBack }: AmbassadorPageProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1761066449630-10a807cdc8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjBsaWdodCUyMG1lZGl0YXRpb24lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NzIzNzM4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Spiritual Light"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-white">The Wanderer Ambassador Program</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white">
              Be the Light <br />
              <span className="text-primary">in Your City</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              You are not lost, but purposefully walking this Earth to serve, to connect, to love.
            </p>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
              Apply to Become an Ambassador
            </Button>
          </motion.div>
        </div>
      </section>

      {/* You Are Being Called */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl mb-6">You Are Being Called</h2>
            <div className="prose prose-lg max-w-3xl mx-auto text-muted-foreground">
              <p className="text-lg leading-relaxed">
                If you're reading this, it's not by accident. You've felt it—that pull toward something deeper, 
                that knowing that there's more to gatherings than just events, more to connection than just meetings. 
                You sense that spiritual seekers in your city are scattered, searching, often feeling alone in their journey.
              </p>
              <p className="text-lg leading-relaxed mt-6">
                <strong className="text-foreground">You are a Wanderer.</strong> Not lost, but purposefully walking this Earth to serve, 
                to connect, to love.
              </p>
              <p className="text-lg leading-relaxed mt-6">
                And now, we're inviting you to anchor the light in your city.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Does It Mean */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-6">What Does It Mean to Be a Wanderer Ambassador?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              As a Wanderer Ambassador, you're not just promoting a platform—you're weaving the fabric 
              of awakened community in your city.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-8 h-full hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl mb-4">Be the Voice of Awakening</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Be the face of Wanderer in your community</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Share the magic of authentic spiritual connection</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Hold space for teachers and seekers to find each other</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Radiate the truth that we are all One</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8 h-full hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl mb-4">Bring Teachers Into the Light</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Guide spiritual teachers, healers, and facilitators to join our platform</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Help them share their gifts with those who need them most</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Witness the ripple effect as one connection becomes many</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-8 h-full hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl mb-4">Anchor the Community</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Attend events and hold space with presence and love</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Create content that inspires (photos, stories, testimonials)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Connect people who are meant to find each other</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Embody the welcoming energy that makes others feel at home</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Sacred Exchange */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-6">The Sacred Exchange: Your Gifts</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We honor your service with tangible support for your mission
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-white hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl mb-4">Lifetime Abundance Flow</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Receive <strong className="text-foreground">lifetime commission</strong> for every host you onboard who 
                  receives payments through the platform. This isn't just compensation—it's an energy exchange. 
                  As they thrive, you thrive. As the community grows, abundance flows.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Example:</p>
                  <p className="text-sm">
                    A yoga teacher you onboard earns <strong>€500/month</strong> through Wanderer 
                    → You receive <strong className="text-primary">€75/month</strong>, for as long as they're active.
                  </p>
                  <p className="text-sm mt-2">
                    Onboard 10 thriving hosts = <strong className="text-primary text-lg">€750/month</strong> in passive flow.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-white hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl mb-4">Wanderer Access: Yours Forever</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Wanderer Plus membership <strong className="text-foreground">free for life</strong> (€10/month value)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Priority access to all events in your city</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Early access to new features and city launches</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Exclusive ambassador-only events and retreats</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-white hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                  <Gift className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl mb-4">Sacred Tools & Recognition</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Exclusive Wanderer Ambassador swag (apparel, art, meditation tools)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Custom ambassador profile badge</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Featured in our community spotlights</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Invitation to annual Wanderer Gathering (all expenses covered)</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-white hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <Network className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl mb-4">Connection Beyond the Veil</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Private community with fellow ambassadors worldwide</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Monthly calls with founders and spiritual leaders</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Co-creation sessions: your voice shapes the platform</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Mentorship and support for your own spiritual path</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who Is Called */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-6">Who Is Called to This Path?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              If you're reading this and asking yourself the question, chances are, you are.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-purple-50 to-pink-50">
                <h3 className="text-2xl mb-4">The Feeling</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>"I don't belong here"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>"I am different, other-than"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>A sense that there's something deeper calling you beyond the material world</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-blue-50 to-cyan-50">
                <h3 className="text-2xl mb-4">The Inner Knowing</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>You're here to serve others, to love this world</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>You feel drawn to connect people and hold space</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>Society's definitions no longer fit who you're becoming</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-green-50 to-emerald-50">
                <h3 className="text-2xl mb-4">Your Natural Gifts</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>You're connected to spiritual community in your city</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>You attend yoga, meditation, or healing gatherings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>You naturally bring people together</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>You believe in abundance for all</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          </div>

          {/* What You Need */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="p-10 bg-white text-center max-w-3xl mx-auto">
              <h3 className="text-3xl mb-6">What You Need</h3>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="text-lg mb-3 text-muted-foreground">You don't need to be:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-2">✗</span>
                      <span>A certified teacher or healer</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✗</span>
                      <span>An extroverted networker</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✗</span>
                      <span>Someone who has it all figured out</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✗</span>
                      <span>Free from doubts or struggles</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg mb-3 text-primary">You need only:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>An open heart</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>A calling to serve by simply being yourself</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>The willingness to learn how to give and receive love</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span>Trust that your presence is your gift</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1740065592719-052d3e5ec6fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjb25uZWN0aW9uJTIwaGFuZHMlMjB0b2dldGhlcnxlbnwxfHx8fDE3NzIzNzM4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Community Connection"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl mb-6">You Are the Bridge</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Between seeking souls and transformative experiences. You are the one who says, 
                "You are not alone. There is a place for you here."
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As they thrive, you thrive. As the community grows, abundance flows. 
                This is more than a role—it's a sacred calling.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl mb-6">Ready to Answer the Call?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join us in anchoring the light in your city. Together, we're building a world where 
              spiritual connection is accessible to all.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg">
              Apply to Become an Ambassador
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              Applications are reviewed on a rolling basis. We'll be in touch within 7 days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-20" />
    </div>
  );
}
