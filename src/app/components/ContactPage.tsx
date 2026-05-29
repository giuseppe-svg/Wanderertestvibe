import { useState } from 'react';
import { ArrowLeft, Send, Mail, MessageCircle, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { FlowerOfLife, Merkaba, TreeOfLife } from './icons';

interface ContactPageProps {
  onBack: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const contacts = JSON.parse(localStorage.getItem('wanderer_contacts') || '[]');
    const newContact = {
      ...formData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    contacts.push(newContact);
    localStorage.setItem('wanderer_contacts', JSON.stringify(contacts));

    toast.success('Message sent! We\'ll get back to you soon with love and light. 🙏');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Sacred Geometry */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 py-20">
        {/* Animated sacred geometry background */}
        <div className="absolute inset-0 opacity-10">
          <FlowerOfLife className="absolute top-10 left-10 h-32 w-32 text-white animate-pulse" />
          <Merkaba className="absolute top-20 right-20 h-24 w-24 text-white animate-pulse" style={{ animationDelay: '1s' }} />
          <TreeOfLife className="absolute bottom-10 left-1/2 h-28 w-28 text-white animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-6">
            <MessageCircle className="h-16 w-16 text-purple-200 mx-auto mb-4" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Connect With Us
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            We're here to support your spiritual journey. Share your thoughts, questions, or feedback with our conscious community.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-purple-100">
          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-purple-50 rounded-2xl">
              <Mail className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
              <p className="text-sm text-gray-600">hello@wanderer.earth</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-2xl">
              <MessageCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Response Time</h3>
              <p className="text-sm text-gray-600">Within 24-48 hours</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-2xl">
              <User className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Community</h3>
              <p className="text-sm text-gray-600">Global support team</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-gray-700">Your Name *</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your name"
                className="mt-2 bg-purple-50/50 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-gray-700">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your@email.com"
                className="mt-2 bg-purple-50/50 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>

            {/* Category Select */}
            <div>
              <Label htmlFor="category" className="text-gray-700">What can we help you with? *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)} required>
                <SelectTrigger className="mt-2 bg-purple-50/50 border-purple-200 focus:border-purple-400 focus:ring-purple-400">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="event">Event Questions</SelectItem>
                  <SelectItem value="hosting">Hosting Events</SelectItem>
                  <SelectItem value="ambassador">Ambassador Program</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                  <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                  <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Subject Field */}
            <div>
              <Label htmlFor="subject" className="text-gray-700">Subject *</Label>
              <Input
                id="subject"
                type="text"
                required
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder="Brief subject of your message"
                className="mt-2 bg-purple-50/50 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              />
            </div>

            {/* Message Field */}
            <div>
              <Label htmlFor="message" className="text-gray-700">Your Message *</Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Share your thoughts, questions, or feedback..."
                rows={6}
                className="mt-2 bg-purple-50/50 border-purple-200 focus:border-purple-400 focus:ring-purple-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full text-lg gap-2 py-6"
              >
                <Send className="h-5 w-5" />
                Send Message with Love
              </Button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="mt-8 p-6 bg-purple-50 rounded-2xl">
            <p className="text-sm text-gray-600 text-center">
              🌟 Your message will be received with gratitude. We honor every connection and will respond mindfully to support your journey.
            </p>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Join Our Global Community</h3>
          <p className="text-gray-600 mb-6">
            Connect with spiritual seekers and conscious event hosts from around the world
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Discord Community
            </Button>
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Newsletter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}